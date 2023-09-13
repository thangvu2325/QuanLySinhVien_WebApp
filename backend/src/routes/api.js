const express = require("express");
const middlewareControllers = require("../app/controllers/middlewareConstrolles");
const router = express.Router();
const apiController = require("../app/controllers/apiController");
// Student
router.post("/students", apiController.addStudent);
router.get("/students", apiController.getAllStudent);
router.get("/students/:mssv", apiController.getStudentByMssv);
router.put("/students/:mssv", apiController.updateStudentByMssv);
router.delete("/students/:mssv", apiController.deleteStudentByMssv);
// Class
router.post("/classes", apiController.addClass);
router.get("/classes", apiController.getAllClass);
// router.get("/students/:mssv", apiController.getStudentByMssv);
router.put("/classes/:malop", apiController.updateClassByMaLop);
router.delete("/classes/:malop", apiController.deleteClassByMaLop);
// Major
router.post("/majors", apiController.addMajor);
router.get("/majors", apiController.getAllMajor);
router.put("/majors/:manganh", apiController.updateNganhByMaNganh);
router.delete("/majors/:manganh", apiController.deleteMajorByMaNganh);
// subject
router.post("/subjects", apiController.addSubject);
router.get("/subjects", apiController.getAllSubject);
router.put("/subjects/:mamonhoc", apiController.updateSubjectByMaMonHoc);
router.delete("/subjects/:mamonhoc", apiController.deleteSubjectByMaMonHoc);
module.exports = router;
