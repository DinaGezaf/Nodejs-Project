const mongoose = require("mongoose");
require("./../Model/childrenModel");
const ChildSchema = mongoose.model("child");

module.exports.getAllChildren = (request, respose, next) => {
  ChildSchema.find({})
    .then((data) => {
      respose.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};
module.exports.getChildById = (request, respose, next) => {
  ChildSchema.findOne({ _id: request.params._id })
    .then((data) => {
      if (data == null) {
        throw new Error("Child doesn't exist");
      } else {
        respose.status(200).json({ data });
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.addChild = (request, respose, next) => {
  let ChildObject = new ChildSchema({
    _id: request.body._id,
    fullname: request.body.fullname,
    age: request.body.age,
    level: request.body.level,
    address: {
      city: request.body.address.city,
      street: request.body.address.street,
      building: request.body.address.building,
    },
  });
  ChildObject.save()
    .then((data) => {
      respose.status(201).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};
module.exports.updateChild = (request, respose, next) => {
  let set = {
    fullname: request.body.fullname,
    age: request.body.age,
    level: request.body.level,
  };
  let updateObject = {};

  for (let [key, value] of Object.entries(set)) {
    if (value !== undefined) {
      updateObject[key] = value;
    }
  }

  ChildSchema.updateOne({ _id: request.body.id }, { $set: updateObject })
    .then(() => {
      respose.status(200).json({ data: "Updated" });
    })
    .catch((error) => {
      next(error);
    });
};
module.exports.deleteChild = (request, respose, next) => {
  ChildSchema.deleteOne({ id: request.body.id })
    .then(() => {
      respose.status(200).json({ data: "Deleted" });
    })
    .catch((error) => {
      next(error);
    });
};
