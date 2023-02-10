const { body } = require("express-validator");

module.exports.addTeacherValidation = [
  body("id")
    .optional()
    .isMongoId()
    .withMessage("Teacher Id should be ObjectId"),
  body("fullname")
    .isAlpha()
    .withMessage("Teacher FullName should be String")
    .isLength({ min: 3, max: 15 })
    .withMessage("Teacher FullName should be less than 15"),
  body("password")
    .isStrongPassword({
      minLength: 10,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 3,
      minSymbols: 1,
    })
    .withMessage("Invalid Password")
    .isLength({ min: 10 })
    .withMessage("Teacher password should be less than 10"),
  body("email").isEmail().withMessage("Invalid Email"),
  body("image").optional().isString().withMessage("Invalid Image"),
];

module.exports.updateTeacherValidation = [
  body("id")
    .optional()
    .isMongoId()
    .withMessage("Teacher Id should be ObjectId"),
  body("fullname")
    .isAlpha()
    .withMessage("Teacher FullName should be String")
    .isLength({ min: 3, max: 15 })
    .withMessage("Teacher FullName should be less than 15"),
  body("password")
    .isStrongPassword({
      minLength: 10,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 3,
      minSymbols: 1,
    })
    .withMessage("Invalid Password")
    .isLength({ min: 10 })
    .withMessage("Teacher password should be less than 10"),
  body("email").isEmail().withMessage("Invalid Email"),
  body("image").optional().isString().withMessage("Invalid Image"),
];
module.exports.deleteTeacherValidation = [
  body("id").isMongoId().withMessage("Teacher Id should be Entered"),
];
