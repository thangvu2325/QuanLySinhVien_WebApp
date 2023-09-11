const sql = require("./db.js");
const Class = function (lop) {
  this.ten_lop = lop.ten_lop;
  this.khoa = Number(lop.khoa);
  this.ten_nganh = lop.ten_nganh;
  this.ngay_bat_dau = lop.ngay_bat_dau;
};
Class.create = (newClass, result) => {
  sql.query("INSERT INTO Danh_Sach_Lop SET ?", newClass, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Class: ", { id: res.insertId, ...newClass });
    result(null, { id: res.insertId, ...newClass });
  });
};
Class.getAllClass = (result) => {
  let query = "SELECT * FROM Danh_Sach_Lop";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Classs: ", res);
    result(null, res);
  });
};
Class.findByMssv = (mssv, result) => {
  sql.query(
    `SELECT * FROM Danh_Sach_Lop WHERE ma_lop = '${ma_lop}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found Class: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Class with the mssv
      result({ kind: "not_found" }, null);
    }
  );
};

Class.updateByMaLop = (ma_lop, lop, result) => {
  sql.query(
    "UPDATE Classs SET ten_lop = ?, khoa = ?, ten_nganh = ? ,ngay_bat_dau = ? WHERE ma_lop = ?",
    [lop.ten_lop, lop.khoa, lop.ten_nganh, lop.ngay_bat_dau, ma_lop],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Class with the mssv
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Class: ", { ma_lop: ma_lop, ...Class });
      result(null, { ma_lop: ma_lop, ...Class });
    }
  );
};
Class.remove = (ma_lop, result) => {
  sql.query("DELETE FROM Classs WHERE ma_lop = ?", ma_lop, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Class with the mssv
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Class with ma_lop: ", ma_lop);
    result(null, res);
  });
};
module.exports = Class;
