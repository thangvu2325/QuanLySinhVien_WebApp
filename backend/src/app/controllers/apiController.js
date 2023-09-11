const Class = require("../models/Class");
const Major = require("../models/Major");
const Student = require("../models/Student");

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
        gioi_tinh: req.body.gioi_tinh === "Nam" ? 1 : 0,
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
  // Class
  addClass(req, res) {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    console.log(req.body);
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
  // updateStudentByMssv(req, res) {
  //   if (!req.body) {
  //     res.status(400).send({
  //       message: "Content can not be empty!",
  //     });
  //   }
  //   Student.updateByMssv(
  //     req.params.mssv,
  //     new Student({
  //       ...req.body,
  //       gioi_tinh: req.body.gioi_tinh === "Nam" ? 1 : 0,
  //     }),
  //     (err, data) => {
  //       if (err) {
  //         if (err.kind === "not_found") {
  //           res.status(404).send({
  //             message: `Not found Student with mssv ${req.params.mssv}.`,
  //           });
  //         } else {
  //           res.status(500).send({
  //             message: "Error updating Student with mssv " + req.params.mssv,
  //           });
  //         }
  //       } else res.send(data);
  //     }
  //   );
  // }
  // deleteStudentByMssv(req, res) {
  //   Student.remove(req.params.mssv, (err, data) => {
  //     if (err) {
  //       if (err.kind === "not_found") {
  //         res.status(404).send({
  //           message: `Not found Student with mssv ${req.params.mssv}.`,
  //         });
  //       } else {
  //         res.status(500).send({
  //           message: "Could not delete Student with mssv " + req.params.mssv,
  //         });
  //       }
  //     } else res.send({ message: `Student was deleted successfully!` });
  //   });
  // }

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
}

module.exports = new apiControllers();
