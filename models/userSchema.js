const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A User must have a name"],
  },
  email: {
    type: String,
    required: [true, "A user must have a valid-email"],
    unique: [true, "This Email-ID is already taken. Please enter a new one"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid-Email"],
  },
  role: {
    type: String,
    enum: ["user", "admin"], // array of allowed objects
    default: "user",
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: 8,
  },
  confirmedPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    select: false,
    validate: {
      // this will validate if th password is same as confirmed password
      validator: function (el) {
        return el === this.password;
      },
      message: "Password and confirm Password must be same",
    },
  },
});

// middleware for b-crypting the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); //if password is not modified, return
  this.password = await bcrypt.hash(this.password, 12); // else, bcrypt it
  this.confirmedPassword = undefined; // don't store confirmed password in the DB

  next();
});

userSchema.methods.correctPassword = async function (password, storedPassword) {
  return await bcrypt.compare(password, storedPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
