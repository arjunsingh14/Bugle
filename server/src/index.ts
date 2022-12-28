import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URL=process.env.MONGO_URI;

app.get("/ping", (_req, res) => {
  res.send("hi");
});

app.listen(PORT, () => {
  mongoose
    .connect(MONGO_URL)
    .then(() => console.log(console.error(`listening on poert ${PORT}`)))
    .catch((error) => console.log(error));
});
