const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // ONLY THE ERROR THAT ARE OPERATIONAL HAS TO BE SEND TO THE CLIENT

  //Operational errors are the known errors or trusted errors
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // This is the unkown error
    // Log the error to the console
    console.error("Error!!!", err);

    //send the error to the client
    res.status(500).json({
      status: err.status,
      message: "Something went wrong!!",
    });
  }
};

module.exports = (err, req, res, next) => {
  // Basic information of the error
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "error";

  // This is the response we are sending for the error
  // The response will be different for the "development" mode & "production" mode

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, res);
  }
};
