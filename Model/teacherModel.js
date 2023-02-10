const mongoose = require("mongoose");

const validatePassword = function (password) {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  return regex.test(password);
};

const validateEmail = function (email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};



const TeacherSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId },
  fullname: { type: String, required: true },
  password: {
    type: String,
    validate: [validatePassword, "Please enter a valid password"],
    required: true,
  },
  email: {
    type: String,
    validate: [validateEmail, "Please enter a valid email"],
    required: true,
  },
  image: { type: String },
});

mongoose.model("teacher", TeacherSchema);
