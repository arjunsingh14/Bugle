import mongoose, { Schema } from "mongoose";

interface User {
  email: string;
  username: string;
  password: string;
  createdAt: Date;
}

const userSchema = new Schema<User>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<User>("User", userSchema);
