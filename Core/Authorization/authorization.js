const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
  try {
    const token = request.get("authorization").split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRETKEY);
    console.log(token);
    console.log(decodedToken);
    request.role = decodedToken.role;
    request.id = decodedToken.id;

    next();
  } catch (error) {
    error.message = "Not Authorized";
    error.status = 403;
    next(error);
  }
};

module.exports.checkAdmin = (request, response, next) => {
  if (request.role == "admin") {
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 401;
    next(error);
  }
};

module.exports.checkTeacherAndAdmin = (request, response, next) => {
  if (request.role == "admin" || request.role == "teacher") {
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 401;
    next(error);
  }
};
