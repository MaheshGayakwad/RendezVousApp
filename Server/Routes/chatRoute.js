import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  accessChat,
  addToGroup,
  createGroupChat,
  fetchChat,
  removeFromGroup,
  renameGroup,
} from "../controller/chatController.js";

const router = express.Router();

router.get("/", protect, fetchChat);
router.post("/", protect, accessChat);
router.post("/group", protect, createGroupChat);
router.put("/rename", protect, renameGroup);
router.put("/remove", protect, removeFromGroup);
router.put("/groupAdd", protect, addToGroup);

export default router;
