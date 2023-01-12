import React from 'react'

interface prop {
    imgSrc: string;
    article: string;
    summary: string;
    url: string;
}

const Card = ({imgSrc, article, summary, url} : prop) => {
  return (
   <div className="max-w-sm rounded overflow-hidden shadow-lg">
  <img className="w-full" src={imgSrc} alt="Sunset in the mountains"/>
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{article}</div>
    <p className="text-gray-700 text-base">
      {summary}
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
  </div>
</div>
  )
}

export default Card