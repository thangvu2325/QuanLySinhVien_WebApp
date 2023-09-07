const Student = require("../models/Student");

class apiControllers {
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
}

module.exports = new apiControllers();
