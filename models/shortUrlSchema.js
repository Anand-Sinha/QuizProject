const mongoose = require("mongoose");
const shortId = require("shortid");

var shortUrlSchema = new mongoose.Schema({
  full:{
    type: String,
    required: true
  },
  short:{
    type: String,
    required: true,
    default: shortId.generate()
  }
});

const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);

module.exports = ShortUrl;
