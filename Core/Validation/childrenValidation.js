const { body } = require("express-validator");

module.exports.addChildrenValidation = [
  body("id").isInt().withMessage("Child Id should be Number"),
  body("fullname").isAlpha().withMessage("Child FullName should be String"),
  body("age").isInt().withMessage("Child Age should be Number"),
  body("level")
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("level should be one of these PreKG,KG1,KG2"),
  body("address").optional().isObject().withMessage("Invalid Address"),
  body("address.city")
    .optional()
    .isAlpha()
    .withMessage("Address City should be String"),
  body("address.street")
    .optional()
    .isInt()
    .withMessage("Address City should be Number"),
  body("address.building")
    .optional()
    .isInt()
    .withMessage("Address City should be Number"),
];
module.exports.updateChildrenValidation = [
  body("id").optional().isInt().withMessage("Child Id should be Number"),
  body("fullname")
    .optional()
    .isAlpha()
    .withMessage("Child FullName should be String"),
  body("age").isInt().withMessage("Child Age should be Number"),
  body("level")
    .optional()
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("level should be one of these PreKG,KG1,KG2"),
  body("address").optional().isObject().withMessage("Invalid Address"),
  body("address.city")
    .optional()
    .isAlpha()
    .withMessage("Address City should be String"),
  body("address.street")
    .optional()
    .isInt()
    .withMessage("Address City should be Number"),
  body("address.building")
    .optional()
    .isInt()
    .withMessage("Address City should be Number"),
];

module.exports.deleteChildValidation = [
  body("id").isInt().withMessage("Child Id should be Entered"),
];
