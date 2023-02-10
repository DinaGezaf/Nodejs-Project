const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const ClassSchema = new mongoose.Schema(
  {
    _id: Number,
    name: { type: String, required: true, unique: true },
    supervisor: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "teacher",
    },
    childrenIds: [{ type: Number, ref: "child" }],
  },
  {
    _id: false,
  }
);
ClassSchema.plugin(autoIncrement, { id: "class_count" });
mongoose.model("class", ClassSchema);
