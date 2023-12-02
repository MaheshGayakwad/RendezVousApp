import express from "express";
import {
  registerUser,
  authUser,
  allUsers,
} from "../controller/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, allUsers); // protect authorises the logged in user.
router.post("/", registerUser);
router.post("/login", authUser);

export default router;
