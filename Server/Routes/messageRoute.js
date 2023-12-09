import express from "express";
import { allMessage, sendMessage } from "../controller/messageController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, sendMessage);
router.get("/:chatId", protect, allMessage);

export default router;
