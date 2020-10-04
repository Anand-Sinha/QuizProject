//jshint esversion:8
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userSchema");
const OUser = require("../models/oauthUsers");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { json } = require("body-parser");

const sendToken = (id, res) => {
  const token = jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  res.cookie("jwt", token, {
    expiresIn: new Date(
      Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });

  return token;
};

// exports.oauthSignUp = catchAsync(async (req, res, next) => {
//   console.log(req.body);
//   const newUser = await OUser.create(req.body);
//   const token = sendToken(newUser._id, res);
//   // res.status(201).json({
//   //   status: "success",
//   //   message: "Signed-up successfully",
//   //   token,
//   //   user: newOuser,
//   // });
//   res.redirect("/");
//   next();
// });

exports.signUp = catchAsync(async (req, res, next) => {
  console.log(req.body);
  console.log("Signup Working");
  const newUser = await User.create(req.body);

  const token = sendToken(newUser._id, res);

  // res.status(201).json({
  //   status: "success",
  //   message: "Signed-in successfully",
  //   token,
  //   user: newUser,
  // });

  res.redirect("/");

  next();
});

// exports.oauthLogin = catchAsync(async (req, res, next) => {
//   const { _id, userName } = req.body;
//   const ouser = await OUser.findOne({
//     _id,
//   });
//   if (ouser == null) {
//     return next(new AppError("You haven't Signed Up Yet", 401));
//   } else {
//     console.log(ouser);
//     const token = sendToken(ouser._id, res);
//     // res.status(200).json({
//     //   status: "success",
//     //   message: "Logged-in successful",
//     //   token,
//     //   data: ouser,
//     // });
//     res.redirect("/");
//   }
// });

exports.login = catchAsync(async (req, res, next) => {
  // get the email and password from the req.body
  const { email, password } = req.body;

  // if it is not there, send error
  if(password==undefined){
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return next(new AppError("User don't exist, signUp", 401));
    }
    const token = sendToken(user._id, res);
  }
  else{
  if (!email || !password)
    return next(new AppError("Please provide email and password", 400));

  //check if the user exists
  const user = await User.findOne({
    email,
  }).select("+password");
  //   console.log(user);
  let result = await user.correctPassword(password, user.password);
  //   console.log(result);

  if (!user || !result) {
    return next(new AppError("E-mail or Password is incorrect", 401));
  }

  //else, create a JWT from it, and send it back as the response
  const token = sendToken(user._id, res);

  user.password = undefined;
  }
  // res.status(200).json({
  //   status: "success",
  //   message: "Logged-in successful",
  //   token,
  //   data: user,
  // });

  res.redirect("/");
});

exports.logout = catchAsync(async (req, res, next) => {
  // res.cookie("jwt", "logout", {
  //   expiresIn: new Date(Date.now() + 10 * 1000),
  //   httpOnly: true,
  // });

  res.clearCookie("jwt");
  res.clearCookie("user");
  res.status(200).json({
    status: "success",
    message: "User has been logged out",
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // get the token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token)
    return next(
      new AppError("You are not logged in!! Please login to continue", 401)
    );

  //verify the token
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(decode); // This decoded data will be having ID of the user that is logged in

  //check if the user with that token exists
  const currentUser = await User.findById(decode.id);
  if (!currentUser)
    return next(
      new AppError("User belonging to this token has been deleted", 404)
    );

  currentId = currentUser._id;
  //grant access to the protected route
  res.cookie("user", currentId, {
    expiresIn: new Date(
      Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
  });
  req.user = currentUser;

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to complete this action", 403)
      );
    }

    next();
  };
};
