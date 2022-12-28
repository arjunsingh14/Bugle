import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/user";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
app.use(express.json());

app.use("/api/v1", router);
app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGO_URI || "")
    .then(() => console.log(`Listening on port ${PORT}`))
    .catch((error) => console.log(error));
});
