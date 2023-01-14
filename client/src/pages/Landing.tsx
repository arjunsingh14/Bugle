import newspaper from "../assets/newspaper.svg";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchArticles } from "../features/articles";
import { AppDispatch } from "../features/store";
import { RootState } from "../features/store";
import { useSelector } from "react-redux";
import Card from "../components/Card";
interface articleState {
  topHeadlines: any;
  filteredHeadlines: object[];
  sources: string[];
  country: string;
}
const Landing = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  const { topHeadlines } = useSelector<RootState, articleState>(
    (state) => state.article
  );

  return (
    <div className="mt-20">
      <div className="flex w-full flex-wrap-reverse items-center justify-center gap-x-10">
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
              Bugle aims to solve that issue by allowing <br></br>you to control
              which sources you like.
            </p>
          </div>
          <button className="rounded-full text-white bg-secondary px-7 py-4 mt-3 hover:bg-black transition">
            Sign up
          </button>
        </section>
        <div className="shrink-1 sm:px-5">
          <img src={newspaper} className="object-containe" alt="" />
        </div>
      </div>
      <section className="px-5">
        <h1>Top headlines in the us</h1>
        <div className="grid grid-cols-3 gap-5">

        {topHeadlines.map((article: any) => {
          const {title, urlToImage, description, url} = article;
          return (<Card title={title} imgSrc={urlToImage} summary={description} url={url}></Card>)
        })}
        </div>
      </section>
    </div>
  );
};

export default Landing;
