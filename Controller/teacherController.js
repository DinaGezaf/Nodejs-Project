const mongoose = require("mongoose");
require("./../Model/teacherModel");
const TeacherSchema = mongoose.model("teacher");

module.exports.getAllTeachers = (request, respose, next) => {
  TeacherSchema.find({})
    .then((data) => {
      respose.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};
module.exports.getTeacherById = (request, respose, next) => {
  TeacherSchema.findOne({ _id: request.params._id })
    .then((data) => {
      if (data == null) {
        throw new Error("Teacher doesn't exist");
      } else {
        respose.status(200).json({ data });
      }
    })
    .catch((error) => {
      next(error);
    });
};
module.exports.addTeacher = (request, respose, next) => {
  let TeacherObject = new TeacherSchema({
    fullname: request.body.fullname,
    password: request.body.password,
    email: request.body.email,
    image: request.body.image,
  });
  TeacherObject.save()
    .then((data) => {
      respose.status(201).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};
module.exports.updateTeacher = (request, respose, next) => {
  let set = {
    fullname: request.body.fullname,
    password: request.body.password,
    email: request.body.email,
  };
  let updateObject = {};

  for (let [key, value] of Object.entries(set)) {
    if (value !== undefined) {
      updateObject[key] = value;
    }
  }
  TeacherSchema.updateOne({ _id: request.body._id }, { $set: updateObject })
    .then(() => {
      respose.status(200).json({ data: "Updated" });
    })
    .catch((error) => {
      next(error);
    });
};
module.exports.deleteTeacher = (request, respose, next) => {
  TeacherSchema.deleteOne({ id: request.body.id })
    .then(() => {
      respose.status(200).json({ data: "Deleted" });
    })
    .catch((error) => {
      next(error);
    });
};
