const mongoose = require("mongoose");
require("./../Model/classModel");

const ClassSchema = mongoose.model("class");
const TeacherSchema = mongoose.model("teacher");
const ChildSchema = mongoose.model("child");

module.exports.getAllClass = (request, respose, next) => {
  ClassSchema.find({})
    .populate({ path: "supervisor", select: { fullname: 1 } })
    .populate({ path: "childrenIds", select: { fullname: 1 } })
    .then((data) => {
      respose.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};
module.exports.getClassById = (request, respose, next) => {
  ClassSchema.findOne({ _id: request.params._id })
    .then((data) => {
      if (data == null) {
        throw new Error("Class doesn't exist");
      } else {
        respose.status(200).json({ data });
      }
    })
    .catch((error) => {
      next(error);
    });
};
module.exports.getClassChild = (request, respose, next) => {
  ClassSchema.findOne({ _id: request.params._id }, { childrenIds: 1 })
    .populate({ path: "child", select: { fullname: 1 } })
    .then((data) => {
      if ((request._id = data.supervisor._id || request.role == "teacher")) {
        if (data == null) {
          throw new Error("Class Child doesn't exist");
        } else {
          respose.status(200).json({ data });
        }
      } else {
        next(error);
      }
    })
    .catch((error) => {
      next(error);
    });
};
module.exports.getClassTeacher = (request, respose, next) => {
  ClassSchema.findOne({ _id: request.params._id }, { supervisor: 1 })
    .populate({ path: "teacher", select: { fullname: 1 } })
    .then((data) => {
        if ((request.id = data.supervisor || request.role == "teacher")) {
          if (data == null) {
            throw new Error("Class Teacher doesn't exist");
          } else {
            respose.status(200).json({ data });
          }
        } else {
          next(error);
        }
    })
    .catch((error) => {
      next(error);
    });
};
module.exports.addClass = (request, respose, next) => {
  let ClassObject = new ClassSchema({
    name: request.body.name,
    supervisor: request.body.supervisor,
    childrenIds: request.body.childrenIds,
  });
  TeacherSchema.findOne({ _id: request.body.supervisor }).then((data) => {
    if (data == null) {
      throw new Error("Teacher doesn't exist ");
    } else {
      ChildSchema.find({ _id: { $in: request.body.childrenIds } })
        .then((data) => {
          console.log(data);
          if (data.length < request.body.childrenIds.length) {
            throw new Error("child doesn't exist ");
          } else {
            ClassObject.save()
              .then((data) => {
                console.log(data);
                respose.status(201).json({ data });
              })
              .catch((error) => {
                next(error);
              });
          }
        });
    }
  });
};

module.exports.updateClass = (request, respose, next) => {
  let ClassObject = {
    name: request.body.name,
    supervisor: request.body.supervisor,
  };

  TeacherSchema.findOne({ id: request.body.supervisor }).then((data) => {
    if (data == null) {
      throw new Error("Teacher doesn't exist ");
    } else {
      console.log(id);

      ChildSchema.find(
        { id: { $in: request.body.childrenIds } },
        { _id: 0, fullname: 1 }
      )
        .count()
        .then((data) => {
          if (data.length < request.body.childrenIds.length) {
            throw new Error("child doesn't exist ");
          } else {
            console.log(request.body._id);
            ClassSchema.updateOne(
              { _id: request.body._id },
              {
                $addToSet: { childrenIds: request.body.childrenIds },
                $set: ClassObject,
              }
            )
              .then((data) => {
                respose.status(201).json({ data: "Updated" });
              })
              .catch((error) => {
                next(error);
              });
          }
        });
    }
  });
};
module.exports.deleteClass = (request, respose, next) => {
  ClassSchema.deleteOne({ id: request.body._id })
    .then((data) => {
      respose.status(200).json({ data: "Deleted" });
    })
    .catch((error) => {
      next(error);
    });
};
