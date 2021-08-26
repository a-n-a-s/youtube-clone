import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./categories.css";
import {
  getMostPopularVideos,
  getVidoesByCategory,
} from "../../Redux/Actions/videos.action";

const KeyWord = [
  "All",
  "React js",
  "Angular js",
  "React Native",
  "use of API",
  "Redux",
  "Music",
  "Algorithm Art ",
  "Guitar",
  "Bengali Songs",
  "Coding",
  "Cricket",
  "Football",
  "Real Madrid",
  "Gatsby",
  "Poor Coder",
  "Shwetabh",
];

const Categories = () => {
  const [activeElement, setActiveElement] = useState("ALL");
  const dispatch = useDispatch();
  const handleClick = (value) => {
    setActiveElement(value);
    if (value === "ALL") {
      dispatch(getMostPopularVideos());
    } else {
      dispatch(getVidoesByCategory(value));
    }
  };

  return (
    <div className="catergoriesBar">
      {KeyWord.map((value, i) => (
        <span
          onClick={() => {
            handleClick(value);
          }}
          className={activeElement === value ? "active" : ""}
          key={i}
        >
          {value}
        </span>
      ))}
    </div>
  );
};

export default Categories;
