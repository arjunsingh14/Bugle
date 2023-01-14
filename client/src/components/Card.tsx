import React from "react";

interface prop {
  imgSrc: string;
  title: string;
  summary: string;
  url: string;
}

const Card = ({ imgSrc, title, summary, url }: prop) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={imgSrc} alt="Sunset in the mountains" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{summary}</p>
        <a href={url}>Link to article</a>
      </div>
    </div>
  );
};

export default Card;
