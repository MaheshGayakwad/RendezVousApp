import express from "express";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// router.get("/", protect, fetchChats);
// router.post("/", protect, accessChats);
// router.post("/group", protect, createGroupChat);
// router.put("/rename", protect, renameGroup);
// router.put("/remove", protect, removeFromGroup);
// router.put("/groupAdd", protect, addToGroup);

export default router;
