const express = require("express");
const controller = require("./../Controller/authenticationController");

const AuthenicatationRouter = express.Router();

AuthenicatationRouter.post("/login", controller.login);

module.exports = AuthenicatationRouter;
