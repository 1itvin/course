const express = require("express");
const { User } = require("../models");
const { hashPassword, isPasswordValid } = require("../utils/hashPass");

const router = express.Router();

// Create User / Signup User
router.route("/signup").post(async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const isUserFound = await User.findOne({
      where: {
        email,
      }, 
    });
    if (isUserFound) {
      next({ message: "User already exists", statusCode: 400 });
    }
    
    const hashedPass = await hashPassword(password);
    await User.create({
      email,
      password: hashedPass,
      first_name: firstName,
      last_name: lastName,
    });
    res.status(201).json({ message: "User has been created" });
  } catch (err) {
    next({ message: "Error occured while signing up user", statusCode: 500 });
  }
});

// Check if User exists
router.route("/login").post(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({
      where: {
        email,
      },
    });
    if (!foundUser) {
      next({ message: "User not found", statusCode: 400 });
    }
    const passwordsMatch = await isPasswordValid(password, foundUser.password);
    if (!passwordsMatch) {
      next({ message: "Wrong password", statusCode: 400 });
    }
    res.status(200).json({ message: "Successfully login" }); 
  } catch (err) {
    next({ message: "Error occured while logining user", statusCode: 500 });
  }
});

// Get Users
router.route("/").get(async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.status(200).json({ data: allUsers });
  } catch (err) {
    next({ message: "Error occured while getting all users", statusCode: 500 });
  }
});

module.exports = router;
