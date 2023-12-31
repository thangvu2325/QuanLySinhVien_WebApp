const sql = require("./db.js");
const Student = function (student) {
  this.ho = student.ho;
  this.ten_dem = student.ten_dem;
  this.ten = student.ten;
  this.gioi_tinh = Number(student.gioi_tinh);
  this.ten_lop = student.ten_lop;
  this.so_dien_thoai = student.so_dien_thoai;
  this.khoa = student.khoa;
  this.ten_nganh = student.ten_nganh;
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
    "UPDATE students SET ho = ?, ten_dem = ?, ten = ? ,gioi_tinh = ?, ten_lop = ?,khoa = ? ,ten_nganh= ?, so_dien_thoai = ? WHERE mssv = ?",
    [
      student.ho,
      student.ten_dem,
      student.ten,
      student.gioi_tinh,
      student.ten_lop,
      student.khoa,
      student.ten_nganh,
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

// Mon hoc
Student.getAllMonhocOfStudent = (mssv, result) => {
  sql.query("select * from Danh_Sach_Diem where mssv = ?", mssv, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
Student.addMonhocForStudent = (mssv, newSubject, result) => {
  sql.query(
    "INSERT INTO Danh_Sach_Diem SET ?",
    { ...newSubject, mssv },
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created Subject for Student: ", {
        id: res.insertId,
        ...newSubject,
      });
      result(null, { id: res.insertId, ...newSubject });
    }
  );
};
Student.deleteMonhocForStudent = (mssv, ma_diem, result) => {
  sql.query(
    "delete from danh_sach_diem dsd  where  mssv = ? && ma_diem = ?",
    [mssv, ma_diem],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found diem with the ma_diem
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted diem for Student with ma_diem: ", ma_diem);
      result(null, res);
    }
  );
};
Student.updateMonhocForStudent = (ma_diem, score, result) => {
  sql.query(
    "UPDATE Danh_Sach_Diem SET diem_qua_trinh = ?, diem_thi = ? WHERE ma_diem = ?",
    [Number(score.diem_qua_trinh), Number(score.diem_thi), Number(ma_diem)],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found diem with the ma_diem
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Diem for Student: ", { ma_diem: ma_diem });
      result(null, { ma_diem: ma_diem });
    }
  );
};
module.exports = Student;
