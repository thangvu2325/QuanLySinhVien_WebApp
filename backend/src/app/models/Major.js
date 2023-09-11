const sql = require("./db.js");
const Major = function (major) {
  this.ten_nganh = major.ten_nganh;
};
Major.create = (newMajor, result) => {
  sql.query("INSERT INTO Majors SET ?", newMajor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Major: ", { id: res.insertId, ...newMajor });
    result(null, { id: res.insertId, ...newMajor });
  });
};
Major.getAllMajor = (result) => {
  let query = "SELECT * FROM Majors";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Majors: ", res);
    result(null, res);
  });
};
Major.findByMaNganh = (ma_nganh, result) => {
  sql.query(
    `SELECT * FROM Danh_Sach_Lop WHERE ma_nganh = '${ma_nganh}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found Major: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Major with the ma_nganh
      result({ kind: "not_found" }, null);
    }
  );
};

Major.updateByMaLop = (ma_lop, lop, result) => {
  sql.query(
    "UPDATE Majors SET ten_nganh = ? WHERE ma_nganh = ?",
    [lop.ten_nganh, ma_nganh],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Major with the mssv
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Major: ", { ma_nganh: ma_nganh, ...Major });
      result(null, { ma_nganh: ma_nganh, ...Major });
    }
  );
};
Major.remove = (ma_lop, result) => {
  sql.query("DELETE FROM Majors WHERE ma_nganh = ?", ma_nganh, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Major with the mssv
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Major with ma_nganh: ", ma_nganh);
    result(null, res);
  });
};
module.exports = Major;
