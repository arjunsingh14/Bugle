import express = require("express");
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
import "express-async-errors";
import userRouter from "./routes/user";
import articleRouter from "./routes/articles";
import cors =  require("cors");
import middleware from "./error";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use("/api/v1", userRouter);
app.use("/api/v1", articleRouter);

app.get("*", (_req, res) => {
  res.sendFile("dist");
});


app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
mongoose.set("strictQuery", false);
app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGO_URI || "")
    .then(() => console.log(`Listening on port ${PORT}`))
    .catch((error) => console.log(error));
});
