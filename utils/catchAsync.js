// THIS FUNCTION WILL HELP TO CATCH ALL THE ASYNC ERRORS FROM THE CODE
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
