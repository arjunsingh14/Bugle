import User from "src/models/user";
import express from "express";

interface userModel {
  email: string;
  username: string;
  password: string;
}

// Register a user
const register = async (
  // used generics to access req.body, read more on generics
  req: express.Request<object, object, userModel>,
  res: express.Response
): Promise<express.Response> => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      throw new Error();
    }
    const newUser = await User.create({ email, username, password });

    return res.status(200).json({ newUser });
  } catch (error) {
    return res.status(400).json({ msg: "Bad request" });
  }
};


export {register };