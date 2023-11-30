import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/:name", (req, res) => {
  const name = req.params.name;
  res.send(name);
});

app.listen(3000, (req, res) => {
  console.log("Server is running on port 3000");
});
