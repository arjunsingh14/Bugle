import React from "react";
import newspaper from "../assets/newspaper.svg";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchArticles } from "../features/auth";
import { AppDispatch } from "../features/store";
import { RootState } from "../features/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { regOrLog } from "../features/auth";
import Navbar from "../components/Navbar";

interface storeState {
  email: string | null;
  token: string | null;
  register: boolean;
  topHeadlines: object[];
  filteredHeadlines: object[];
  sources: string[];
  country: string;
}

const Landing = () => {
  const { register } = useSelector<RootState, storeState>((state) => state.reducer);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  const { topHeadlines } = useSelector<RootState, storeState>(
    (state) => state.reducer
  );

  return (
    <>
      <Navbar></Navbar>
      <div className="mt-20">
        <div className="flex w-full h-1/6 flex-wrap-reverse items-center justify-center gap-x-10">
          <section>
            <h1 className="text-4xl">
              Choose your <br></br>
              <span className="font-bold">trusted</span> sources
            </h1>
            <div>
              <p className="sm:text-md mt-4">
                In the age of misinformation it's hard to
                <br></br>
                block out irreputable articles on the internet.
                <br></br>
                Bugle aims to solve that issue by allowing <br></br>you to
                control which sources you like.
              </p>
            </div>
            <Link
              className="block w-1/3 rounded-full text-white bg-secondary px-4 py-4 mt-3 hover:bg-black transition"
              to="/login"
              onClick={() => dispatch(regOrLog({ isReg: true }))}
            >
              Sign up
            </Link>
          </section>
          <div className="shrink-1 sm:px-5">
            <img src={newspaper} className="object-containe" alt="" />
          </div>
        </div>
        <section className="flex flex-col flex-wrap items-center px-5">
          <h1 className="text-4xl mb-6">Top headlines in the us</h1>
          <div className="lg:grid lg:grid-cols-3 md:grid-cols-1 gap-5">
            {topHeadlines.map((article: any) => {
              const { title, urlToImage, description, url } = article;
              return (
                <Card
                  title={title}
                  imgSrc={urlToImage}
                  summary={description}
                  url={url}
                ></Card>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default Landing;
