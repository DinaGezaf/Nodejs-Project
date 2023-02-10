const express = require("express");
const controller = require("./../Controller/childrenController");
const {
  addChildrenValidation,
  updateChildrenValidation,
  deleteChildValidation,
} = require("./../Core/Validation/childrenValidation");
const checkValidation = require("./../Core/Validation/checkValidation");
const authorizationMW = require("./../Core/Authorization/authorization");
const childrenRoute = express.Router();

childrenRoute
  .route("/child")
  .all(authorizationMW.checkTeacherAndAdmin)
  .get(controller.getAllChildren)
  .post(addChildrenValidation, checkValidation, controller.addChild)
  .patch(updateChildrenValidation, checkValidation, controller.updateChild)
  .delete(deleteChildValidation, checkValidation, controller.deleteChild);

childrenRoute.get(
  "/child/:id",
  authorizationMW.checkTeacherAndAdmin,
  checkValidation,
  controller.getChildById
);

module.exports = childrenRoute;
