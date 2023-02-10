const express = require("express");
const controller = require("./../Controller/classController");
const {
  addClassValidation,
  updateClassValidation,
  deleteClassValidation,
} = require("./../Core/Validation/classValidation");
const checkValidation = require("./../Core/Validation/checkValidation");
const authorizationMW = require("./../Core/Authorization/authorization");
const classRoute = express.Router();

classRoute
  .route("/class")
  .all(authorizationMW.checkTeacherAndAdmin)
  .get(controller.getAllClass)
  .post(addClassValidation, checkValidation, controller.addClass)
  .patch(updateClassValidation, checkValidation, controller.updateClass)
  .delete(deleteClassValidation, checkValidation, controller.deleteClass);

classRoute.get(
  "/class/:id",
  authorizationMW.checkAdmin,
  checkValidation,
  controller.getClassById
);

classRoute.get(
  "/classchildren/:id",
  authorizationMW.checkTeacherAndAdmin,
  checkValidation,
  controller.getClassChild
);
classRoute.get(
  "/classteacher/:id",
  authorizationMW.checkTeacherAndAdmin,
  controller.getClassTeacher
);

module.exports = classRoute;
