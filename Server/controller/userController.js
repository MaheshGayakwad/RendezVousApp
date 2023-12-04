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
      token: generateToken(user._id),
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
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Email or Password is wrong");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  //we want to render all users here just after successfull login
  //we can use req.body or req.params because that data are sent using poast req
  //so we are using queries here

  const searchedText = req.query.search;

  const keyword = searchedText
    ? {
        $or: [
          { name: { $regex: searchedText, $options: "i" } },
          { email: { $regex: searchedText, $options: "i" } },
        ],
      }
    : {}; //this is conditional rendering if searched text has result(true) else false

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  //.find will give authenticated users who have login
  //successfully. We have user a protect middleware
  //in routes from middleware folder so that
  //only user with token gets authenticated..
  res.send(users);
});

export { registerUser, authUser, allUsers };
