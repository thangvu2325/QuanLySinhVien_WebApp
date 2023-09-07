const express = require("express");
const middlewareControllers = require("../app/controllers/middlewareConstrolles");
const router = express.Router();
const apiController = require("../app/controllers/apiController");

router.post("/students", apiController.addStudent);
router.get("/students", apiController.getAllStudent);
router.get("/students/:mssv", apiController.getStudentByMssv);
router.put("/students/:mssv", apiController.updateStudentByMssv);
router.delete("/students/:mssv", apiController.deleteStudentByMssv);

module.exports = router;
