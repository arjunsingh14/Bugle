import axios from "axios";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const getHeadlines = (_req: express.Request, res: express.Response): void => {
  void (async function () {
    try {
      const data = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_KEY}`
      );
      res.json(data.data);
    } catch (error) {
      console.log(error);
    }
  })();
};

export { getHeadlines };
