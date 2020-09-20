const path = require("path");

module.exports = {
  watch: true,
  entry: "./public/js/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "js/bundle.js",
  },
};
