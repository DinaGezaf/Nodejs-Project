const express = require("express");
const controller = require("./../Controller/teacherController");
const {
  addTeacherValidation,
  updateTeacherValidation,
  deleteTeacherValidation,
} = require("./../Core/Validation/teacherValidation");
const checkValidation = require("./../Core/Validation/checkValidation");
const authorizationMW = require("./../Core/Authorization/authorization");
const teacherRoute = express.Router();

teacherRoute
  .route("/teachers")
  .get(authorizationMW.checkAdmin, controller.getAllTeachers)
  .post(
    authorizationMW.checkAdmin,
    addTeacherValidation,
    checkValidation,
    controller.addTeacher
  )
  .patch(
    authorizationMW.checkTeacherAndAdmin,
    updateTeacherValidation,
    checkValidation,
    controller.updateTeacher
  )
  .delete(
    authorizationMW.checkAdmin,
    deleteTeacherValidation,
    checkValidation,
    controller.deleteTeacher
  );

teacherRoute.get(
  "/teachers/:id",
  authorizationMW.checkAdmin,
  checkValidation,
  controller.getTeacherById
);

module.exports = teacherRoute;
