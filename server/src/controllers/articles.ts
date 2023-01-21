import axios from "axios";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import dotenv from "dotenv";

dotenv.config();
interface JwtPayload {
  _id: string;
}



const getTokenFrom = (req: express.Request) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

const getHeadlines = async (_req: express.Request, res: express.Response) => {
  await (async function () {
      const data = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_KEY}`
      );
      res.json(data.data);
  })();
};
const getSources = async (req: express.Request, res: express.Response) => {
  await (async function () {

      const sources = req.params.sources;
      const data = await axios.get(
        `https://newsapi.org/v2/top-headlines?sources=${sources}&apiKey=${process.env.NEWS_KEY}`
      );
      res.json(data.data);
  })();
};

const updateSources = async (req: express.Request, res: express.Response) => {
  await (async function () {

      const token = getTokenFrom(req);
      const decodedToken = jwt.verify(
        token as string,
        process.env.JWT_SECRET as string
      ) as JwtPayload;
      if (!decodedToken._id || !token) {
         res.status(401).json({ error: "token missing or invalid" });
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { sources }  = req.body;
      const user = await User.findOneAndUpdate({_id: decodedToken._id}, {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        sources: sources
      });
  
      res.status(200).json(user?.sources);
      
  })();
};

export { getHeadlines, getSources, updateSources };
