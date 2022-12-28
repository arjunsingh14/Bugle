import User from "../models/user";
import express from "express";
import bcrypt from "bcrypt";
interface userModel {
  email: string;
  username: string;
  password: string;
}

// Register a user
const register =  async (
  // used generics to access req.body, read more on generics
  req: express.Request<object, object, userModel>,
  res: express.Response
): Promise<express.Response> => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      throw new Error("No username or password");
    }
    const salt = 10;
    const hashedPass = await bcrypt.hash(password, salt);

    const user = new User ({email, username, password: hashedPass});
    const newUser = await user.save();

    return res.status(201).json(newUser);

  } catch (error) {

    return res.status(400).json(error);
  }
};


export { register };