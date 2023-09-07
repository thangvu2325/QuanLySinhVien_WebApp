const sql = require("./db.js");
const Student = function (student) {
  this.ho = student.ho;
  this.ten_dem = student.ten_dem;
  this.ten = student.ten;
  this.gioi_tinh = Number(student.gioi_tinh);
  this.lop = student.lop;
  this.so_dien_thoai = student.so_dien_thoai;
  this.nganh = student.nganh;
  this.khoa = Number(student.khoa);
};
Student.create = (newStudent, result) => {
  sql.query("INSERT INTO Students SET ?", newStudent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Student: ", { id: res.insertId, ...newStudent });
    result(null, { id: res.insertId, ...newStudent });
  });
};
Student.getAllStudent = (result) => {
  let query = "SELECT * FROM Students";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Students: ", res);
    result(null, res);
  });
};
Student.findByMssv = (mssv, result) => {
  sql.query(`SELECT * FROM Students WHERE mssv = '${mssv}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Student: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Student with the mssv
    result({ kind: "not_found" }, null);
  });
};

Student.updateByMssv = (mssv, student, result) => {
  sql.query(
    "UPDATE students SET ho = ?, ten_dem = ?, ten = ? ,gioi_tinh = ?, lop = ?, khoa = ?, nganh= ?, so_dien_thoai = ? WHERE mssv = ?",
    [
      student.ho,
      student.ten_dem,
      student.ten,
      student.gioi_tinh,
      student.lop,
      student.khoa,
      student.nganh,
      student.so_dien_thoai,
      mssv,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Student with the mssv
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Student: ", { mssv: mssv, ...student });
      result(null, { mssv: mssv, ...student });
    }
  );
};
Student.remove = (mssv, result) => {
  sql.query("DELETE FROM Students WHERE mssv = ?", mssv, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Student with the mssv
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Student with mssv: ", mssv);
    result(null, res);
  });
};
module.exports = Student;
