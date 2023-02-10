const { body } = require("express-validator");

module.exports.addClassValidation = [
  body("name")
    .isAlpha()
    .withMessage("Class Name should be String")
    .isLength({ min: 3, max: 10 })
    .withMessage("Class Name should be less than 10"),
  body("supervisor").isMongoId().withMessage("Invalid Supervisor"),
  body("childrenIds")
    .isArray({ min: 2 })
    .withMessage("ChildrenIds must be more than 2 "),
  body("childrenIds.*")
    .optional()
    .isInt()
    .withMessage("ChildrenId element must be Number"),
];

module.exports.updateClassValidation = [
  body("name")
    .isAlpha()
    .withMessage("Class Name should be String")
    .isLength({ min: 3, max: 10 })
    .withMessage("Class Name should be less than 10"),
  body("supervisor").isMongoId().withMessage("Invalid Supervisor"),
  body("childrenIds").optional().isArray({ min: 2 }),
  body("childrenIds.*").optional().isInt().withMessage("Invalid Children"),
];

module.exports.deleteClassValidation = [
  body("id").isInt().withMessage("Class Id should be Entered"),
];
