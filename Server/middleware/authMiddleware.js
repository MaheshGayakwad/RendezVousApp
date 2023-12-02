import asyncHandler from "express-async-handler";
import User from "../Models/userModel.js";
import jwt from "jsonwebtoken";

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers["authorization"]; // used to get auth headers from http req
  const token = authHeader && authHeader.split(" ")[1]; // Extract the Bearer token

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decode.id).select("-password");
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Unauthorized - token not valid");
  }
});

export default protect;
