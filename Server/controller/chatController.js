import express from "express";
import expressAsyncHandler from "express-async-handler";
import Chat from "../Models/chatModel.js";
import Message from "../Models/messageModel.js";
import User from "../Models/userModel.js";

const accessChat = expressAsyncHandler(async (req, res) => {
  //this funtion is made to accessing or searching the one on one chats
  //if chat already exists searched result will be provided
  //if chat dosent exist new chat will be created..

  //We are using Chat mongo collection here
  //one on one chat will have
  //groupChat = false,
  //also it should have both users available in users field....

  const { userId } = req.body;

  if (!userId) {
    res.sendStatus(401);
    throw new Error("No user id sent in parameter");
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [{ users: { $eq: req.user._id } }, { users: { $eq: userId } }],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await Chat.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email pic",
  });

  if (isChat.length > 0) {
    //means chat is resent to we will just send it as res
    res.send(isChat[0]);
  } else {
    // means chat is not present means we will have to create a new chat between these two
    // users..
    var chatCreateData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
  }

  try {
    const createdChat = await Chat.create(chatCreateData);
    const fullChatData = await Chat.find(createdChat._id).populate(
      "users",
      "-password"
    );
    res.send(fullChatData);
  } catch (error) {
    res.send(error.Message);
  }
});

const fetchChat = expressAsyncHandler(async (req, res) => {
  // we are getting all element of user array
  //which has same user id as logged in
  //this will provide us with all the
  //one on one chat with logged in perosn

  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const createGroupChat = expressAsyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const renameGroup = expressAsyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChatName = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChatName) {
    res.send("Chat not Found");
  } else {
    res.send(updatedChatName);
  }
});

const addToGroup = expressAsyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const addedNames = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!addedNames) {
    res.send("No names were added");
  } else {
    res.send(addedNames);
  }
});

const removeFromGroup = expressAsyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const removedUser = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removedUser) {
    res.send("No user removed from group");
  } else {
    res.send(removedUser);
  }
});

export {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
