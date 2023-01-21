import React, { FormEvent } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSources, setSource, updateSources } from "../features/auth";
import { AppDispatch } from "../features/store";
const SelectorForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const availSources = [
    { id: "bbc-news", name: "BBC" },
    { id: "the-wall-street-journal", name: "The Wall Street Journal" },
    { id:"cnn", name: "CNN"},
    { id: "bloomberg", name: "Bloomberg"},
  ];
  const [checked, setChecked] = useState([] as string[]);
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    let updatedList:string[] = [...checked];
    if (e.target.checked) {
      updatedList = [...checked, target.name];
    } else {
      updatedList.splice(checked.indexOf(target.name), 1);
    }
    setChecked(updatedList);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setSource({ sources: checked }));
    dispatch(updateSources());
    dispatch(fetchSources());
  }

 
  return (
    <nav className="flex flex-col items-center">
      <div className="title">Your Sources:</div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div>
          <div className="flex flex-row">
            {availSources.map((item) => (
              <div className="px-1 lg:px-4" key={item.id}>
                <input
                  value={item.name}
                  name={item.id}
                  type="checkbox"
                  onChange={handleCheck}
                />
                <span className="text-xs md:text-xl">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        <button className="block rounded-full text-white bg-secondary px-1 py-1 mt-3 hover:bg-black transition">
          Filter
        </button>
      </form>
    </nav>
  );
};

export default SelectorForm;
