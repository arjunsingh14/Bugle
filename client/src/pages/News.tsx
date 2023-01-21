import React from "react";
import { useSelector } from "react-redux";
import Form from "../components/SelectorForm";
import { RootState } from "../features/store";
import Card from "../components/Card";
const News = () => {
  interface storeState {
    email: string | null;
    token: string | null;
    register: boolean;
    topHeadlines: object[];
    filteredHeadlines: object[];
    sources: string[];
    country: string;
  }
  const { filteredHeadlines } = useSelector<RootState, storeState>((state) => state.reducer)
  return (
    <div>
      <Form></Form>
      <section className="flex flex-col items-center px-5">
        <h1 className="text-4xl mb-6">Headlines from your sources</h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-5">
          {filteredHeadlines.map((article: any) => {
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
  );
};

export default News;
