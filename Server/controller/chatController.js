import express from "express";
import expressAsyncHandler from "express-async-handler";
import Chat from "../Models/chatModel.js";
import Message from "../Models/messageModel.js";
import User from "../Models/userModel.js";

const accessChat = expressAsyncHandler(async (req, res) => {
  //this funtion is made to accessing or searching the one on one chats
  //if chat already exists searched result will be provided
  //if chat dosent exist new chat will be created..

  const { userId } = req.body;

  if (!userId) {
    res.sendStatus(401);
    throw new Error("No user id sent in parameter");
  }

  //We are using Chat mongo collection here
  //one on one chat will have
  //groupChat = false,
  //also it should have both users available in users field....

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
  try {
    let fetchedChats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
      // we are getting all element of user array
      //which has same user id as logged in
      //this will provide us with all the
      //one on one chat with logged in perosn
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin", "-password");

    fetchedChats = await Chat.populate(fetchedChats, {
      path: "latestMessage.sender",
      select: "name email pic",
    });

    res.send(fetchedChats);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

const createGroupChat = expressAsyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    res.sendStatus(401);
    throw new Error("Users not provided");
  }

  var users = JSON.parse(req.body.users);
  //this is names of users from front end

  if (users.length < 2) {
    res.sendStatus(401);
    throw new Error(" Atleast two users are needed to create a group chat");
  }

  var groupChat = await Chat.create({
    chatName: req.body.name,
    users: users,
    isGroupChat: true,
    groupAdmin: req.user,
  });
  //we created a group chat using front end credentials
  //now we need to populate the results

  try {
    var fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.send(fullGroupChat);
  } catch (error) {
    res.send(error);
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
