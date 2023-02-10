const mongoose = require("mongoose");

const childSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  age: { type: Number, required: true },
  level: { type: String, enum: ["PreKG", "KG1", "KG2"], required: true },
  address: new mongoose.Schema(
    {
      city: { type: String },
      street: { type: Number },
      building: { type: Number },
    },
    {
      _id: false,
    }
  ),
});

mongoose.model("child", childSchema);
