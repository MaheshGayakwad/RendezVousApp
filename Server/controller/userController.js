import express from "express";
import asyncHandler from "express-async-handler";
import User from "../Models/userModel.js";
import { generateToken } from "../config/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please enter all the fields");
  }

  try {
    const userExists = await User.find({ email });

    if (userExists && userExists.length > 0) {
      console.log(userExists);
      res.status(400);
      throw new Error("User already exists");
    }
  } catch (error) {
    console.log(error);
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      ticken: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user ");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.isPasswordSame(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
    });
  } else {
    res.status(400);
    throw new Error("Email or Password is wrong");
  }
});

export { registerUser, authUser };
