import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface User {
  email: string;
  username: string;
  password: string | undefined;
  sources: string [];
  createJWT(userSign: unknown):string;
  _id: Schema.Types.ObjectId;
}

const UserSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  sources: { type: [String], required:true}
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
});


UserSchema.methods.createJWT = function (userSign: object):string {
  return jwt.sign(userSign, process.env.JWT_SECRET as string, {expiresIn: "30D"});
};



export default mongoose.model<User>("User", UserSchema);
