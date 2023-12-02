import express, { json } from "express";
import cors from "cors";
import userRoute from "./Routes/userRouter.js";
import chatRoute from "./Routes/chatRoute.js";
import connectDB from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("App is running smooth as butter ;)");
});

app.use("/user", userRoute);
app.use("/chat", chatRoute);

app.use((req, res, next) => {
  res.status(404).json({ message: "404 Page not found :(" });
});

app.listen(3000, (req, res) => {
  console.log("Server is running on port 3000");
});
