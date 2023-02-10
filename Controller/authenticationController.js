const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const TeacherSchema = mongoose.model("teacher");

module.exports.login = (request, response, next) => {
  if (request.body.userName == "dina" && request.body.password == "123") {
    let token = jwt.sign(
      {
        role: "admin",
        _id: 1,
        userName: "dina",
      },
      process.env.SECRETKEY,
      { expiresIn: "1h" }
    );
    response.status(200).json({ data: "login as Admin", token });
    console.log(token);
  } else {
    TeacherSchema.findOne({
      email: request.body.email,
      password: request.body.password,
    })
      .then((data) => {
        if (data == null) {
          let error = new Error("Not Authenticated");
          error.status = 401;
          throw error;
        } else {
          let token = jwt.sign(
            {
              role: "teacher",
              _id: data._id,
              email: data.email,
            },
            process.env.SECRETKEY,
            { expiresIn: "1h" }
          );
          response.status(200).json({ data: "login as Teacher", token });
          console.log(token);
        }
      })
      .catch((error) => {
        error = new Error("Not Authenticated");
        error.status = 401;
        next(error);
      });
  }
};
