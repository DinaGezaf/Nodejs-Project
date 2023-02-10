const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
const childrenRoute = require("./Routes/childrenRoute");
const teacherRoute = require("./Routes/teacherRoute");
const classRoute = require("./Routes/classRoute");
const authenticationRoute = require("./Routes/authenticationRoute");
const authorizationMW = require("./Core/Authorization/authorization");

const server = express();
let port = process.env.PORT || 8080;

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DB_Connect)
  .then(() => {
    console.log("DB Connected....");
    server.listen(port, () => {
      console.log("Server is listening.. ", port);
    });
  })
  .catch((error) => {
    console.log("DB Error " + error);
  });

server.use(express.json());
server.use(authenticationRoute);
server.use(authorizationMW);
server.use(childrenRoute);
server.use(teacherRoute);
server.use(classRoute);

server.use(morgan("tiny"));

server.use((request, response, next) => {
  response.status(404).json({ message: "Page Not Found" });
});

server.use((error, request, response, next) => {
  response.status(500).json({ message: error + "" });
});
