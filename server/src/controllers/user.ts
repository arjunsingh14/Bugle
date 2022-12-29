import User from "../models/user";
import express from "express";
import bcrypt from "bcrypt";
import { Schema } from "mongoose";

// import jwt from "jsonwebtoken";
interface userModel {
  email: string;
  username: string;
  password: string;
}

interface userSigned {
  _id: Schema.Types.ObjectId;
}

// Register a user
const register = (
  // used generics to access req.body, read more on generics later
  req: express.Request<object, object, userModel>,
  res: express.Response
): void => {
  void (async function () {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      throw new Error("No username or password");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = new User({ email, username, password });
    const newUser = await user.save();
    const token = user.createJWT({ _id: user._id });

    res.status(201).json({ newUser, token });
  })();
};
// login and create a session
const login = (
  req: express.Request<object, object, userModel>,
  res: express.Response
) => {
  void (async function () {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const correctPass =
      user === null ? null : await bcrypt.compare(password, user.password as string);

    if (!(user && correctPass)) {
      throw new Error("Invalid credentials");
    }

    const userSigned: userSigned = {
      _id: user._id,
    };
    const token = user.createJWT(userSigned);
    user.password = undefined;
    res.status(200).json({ user, token });
  })();
};

export { register, login };
