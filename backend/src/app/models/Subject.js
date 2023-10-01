const sql = require("./db.js");
const Subject = function (subject) {
  this.ten_mon_hoc = subject.ten_mon_hoc;
  this.so_tin_chi = subject.so_tin_chi;
};
Subject.create = (newSubject, result) => {
  sql.query("INSERT INTO Danh_Sach_Mon_Hoc SET ?", newSubject, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Subject: ", { id: res.insertId, ...newSubject });
    result(null, { id: res.insertId, ...newSubject });
  });
};
Subject.getAllSubject = (result) => {
  let query = "SELECT * FROM Danh_Sach_Mon_Hoc";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Subjects: ", res);
    result(null, res);
  });
};
Subject.findByMaMonHoc = (ma_mon_hoc, result) => {
  sql.query(
    `SELECT * FROM Danh_Sach_Mon_Hoc WHERE ma_mon_hoc = '${ma_mon_hoc}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found Subject: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Subject with the mssv
      result({ kind: "not_found" }, null);
    }
  );
};

Subject.updateByMaMonHoc = (ma_mon_hoc, subject, result) => {
  sql.query(
    "UPDATE danh_sach_mon_hoc SET ten_mon_hoc = ? WHERE ma_mon_hoc = ?",
    [subject.ten_mon_hoc, ma_mon_hoc],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Subject with the ma_lop
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Subject: ", { ma_mon_hoc: ma_mon_hoc, ...subject });
      result(null, { ma_lop: ma_mon_hoc, ...subject });
    }
  );
};
Subject.remove = (ma_mon_hoc, result) => {
  sql.query(
    "DELETE FROM danh_sach_mon_hoc WHERE ma_mon_hoc = ?",
    ma_mon_hoc,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Subject with the mssv
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted Subject with ma_mon_hoc: ", ma_mon_hoc);
      result(null, res);
    }
  );
};
module.exports = Subject;
