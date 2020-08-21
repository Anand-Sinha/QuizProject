//jshint esversion:8
exports.renderHomePage = (req, res, next) => {
  res.status(200).render("home");
};

exports.renderAddQuesPage = (req, res, next) => {
  res.status(200).render("addQues");
};
