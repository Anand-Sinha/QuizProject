const mongoose = require("mongoose");

var OUserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: [true, "User must have an ID"],
  },
  userName: {
    type: String,
    required: [
      true,
      "User Must Have a Name",
    ],
  },
});

const OUser = mongoose.model("OUser", OUserSchema);

module.exports = OUser;
