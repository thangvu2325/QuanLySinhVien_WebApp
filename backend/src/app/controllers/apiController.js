const Class = require("../models/Class");
const Major = require("../models/Major");
const Student = require("../models/Student");
const Subject = require("../models/Subject");

class apiControllers {
  // Student
  addStudent(req, res) {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    const student = new Student({
      ...req.body,
      gioi_tinh: req.body.gioi_tinh === "Nam" ? 1 : 0,
    });
    Student.create(student, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial.",
        });
      else res.send(data);
    });
  }
  getAllStudent(req, res) {
    Student.getAllStudent((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      else {
        res.status(200).json(data);
      }
    });
  }
  getStudentByMssv(req, res) {
    Student.findByMssv(req.params.mssv, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Student with mssv ${req.params.mssv}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Student with mssv " + req.params.mssv,
          });
        }
      } else res.send(data);
    });
  }
  updateStudentByMssv(req, res) {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    Student.updateByMssv(
      req.params.mssv,
      new Student({
        ...req.body,
        gioi_tinh: Number(req.body.gioi_tinh),
      }),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Student with mssv ${req.params.mssv}.`,
            });
          } else {
            res.status(500).send({
              message: "Error updating Student with mssv " + req.params.mssv,
            });
          }
        } else res.send(data);
      }
    );
  }
  deleteStudentByMssv(req, res) {
    Student.remove(req.params.mssv, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Student with mssv ${req.params.mssv}.`,
          });
        } else {
          res.status(500).send({
            message: "Could not delete Student with mssv " + req.params.mssv,
          });
        }
      } else res.send({ message: `Student was deleted successfully!` });
    });
  }
  // SubjectForStudent
  getAllMonhocOfStudent(req, res) {
    Student.getAllMonhocOfStudent(req.params.mssv, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found MonHoc with mssv ${req.params.mssv}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Monhoc with mssv " + req.params.mssv,
          });
        }
      } else res.send(data);
    });
  }
  // Add subject for Student
  addSubjectForStudent(req, res) {
    if (!req.body) {
      res.status(400).send({
        message: "Content cannot be empty!",
      });
    }
    Student.addMonhocForStudent(req.params.mssv, req.body, (err) => {
      if (err) {
        res.status(500).send({
          message: "Error add Student with mssv " + req.params.mssv,
        });
      } else
        res
          .status(200)
          .json({ message: "Thêm môn học cho sinh viên thành  công" });
    });
  }

  deleteSubjectforStudent(req, res) {
    Student.deleteMonhocForStudent(
      req.params.mssv,
      req.params.ma_diem,
      (err) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Subject with ma_diem ${req.params.ma_diem}.`,
            });
          } else {
            res.status(500).send({
              message:
                "Could not delete Subject for Student with ma_diem " +
                req.params.ma_diem,
            });
          }
        } else res.send({ message: `Subject was deleted successfully!` });
      }
    );
  }
  updateDiemForStudent(req, res) {
    if (!req.body) {
      res.status(400).send({
        message: "Content cannot be empty!",
      });
    }
    Student.updateMonhocForStudent(req.params.ma_diem, req.body, (err) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Subject with ma_diem ${req.params.ma_diem}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Could not update diem for Student with ma_diem " +
              req.params.ma_diem,
          });
        }
      } else res.send({ message: `Subject was updated successfully!` });
    });
  }
  // Class
  addClass(req, res) {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    const lop = new Class(req.body);
    Class.create(lop, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial.",
        });
      else res.send(data);
    });
  }
  getAllClass(req, res) {
    Class.getAllClass((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      else {
        res.status(200).json(data);
      }
    });
  }
  // getStudentByMssv(req, res) {
  //   Student.findByMssv(req.params.mssv, (err, data) => {
  //     if (err) {
  //       if (err.kind === "not_found") {
  //         res.status(404).send({
  //           message: `Not found Student with mssv ${req.params.mssv}.`,
  //         });
  //       } else {
  //         res.status(500).send({
  //           message: "Error retrieving Student with mssv " + req.params.mssv,
  //         });
  //       }
  //     } else res.send(data);
  //   });
  // }
  updateClassByMaLop(req, res) {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    Class.updateByMaLop(
      req.params.malop,
      new Class({
        ...req.body,
      }),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Class with Ma_Lop ${req.params.malop}.`,
            });
          } else {
            res.status(500).send({
              message: "Error updating Class with malop " + req.params.malop,
            });
          }
        } else res.send(data);
      }
    );
  }
  deleteClassByMaLop(req, res) {
    Class.remove(req.params.malop, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Lop with ma lop ${req.params.malop}.`,
          });
        } else {
          res.status(500).send({
            message: "Could not delete Lop with ma lop " + req.params.malop,
          });
        }
      } else res.send({ message: `Class was deleted successfully!` });
    });
  }

  // Major
  addMajor(req, res) {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    const major = new Major(req.body);
    Major.create(major, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial.",
        });
      else res.send(data);
    });
  }
  getAllMajor(req, res) {
    Major.getAllMajor((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Major.",
        });
      else {
        res.status(200).json(data);
      }
    });
  }
  updateNganhByMaNganh(req, res) {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    Major.updateByMaNganh(
      req.params.manganh,
      new Major({
        ...req.body,
      }),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Major with Ma_Nganh ${req.params.manganh}.`,
            });
          } else {
            res.status(500).send({
              message:
                "Error updating Major with manganh " + req.params.manganh,
            });
          }
        } else res.send(data);
      }
    );
  }
  deleteMajorByMaNganh(req, res) {
    Major.remove(req.params.manganh, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found MAjor with manganh ${req.params.manganh}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Could not delete major with manganh " + req.params.manganh,
          });
        }
      } else res.send({ message: `Major was deleted successfully!` });
    });
  }
  // Subject
  addSubject(req, res) {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    const subject = new Subject(req.body);
    Subject.create(subject, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial.",
        });
      else res.send(data);
    });
  }
  getAllSubject(req, res) {
    Subject.getAllSubject((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Subject.",
        });
      else {
        res.status(200).json(data);
      }
    });
  }
  updateSubjectByMaMonHoc(req, res) {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    Subject.updateByMaMonHoc(
      req.params.mamonhoc,
      new Subject({
        ...req.body,
      }),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Subject with mamonhoc ${req.params.mamonhoc}.`,
            });
          } else {
            res.status(500).send({
              message:
                "Error updating Subject with mamonhoc " + req.params.mamonhoc,
            });
          }
        } else res.send(data);
      }
    );
  }
  deleteSubjectByMaMonHoc(req, res) {
    Subject.remove(req.params.mamonhoc, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found MAjor with mamonhoc ${req.params.mamonhoc}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Could not delete major with mamonhoc " + req.params.mamonhoc,
          });
        }
      } else res.send({ message: `Subject was deleted successfully!` });
    });
  }
}

module.exports = new apiControllers();
