import React from "react";
import MovieList from "./MovieList";
import ChevronRight from "../icons/seemore.png";

import { useGlobalContext } from "../context";

const Featured = () => {
  const { loading } = useGlobalContext();

  return (
    <section className="featured">
      <div className="container">
        <div className="title flex-2">
          <h2>Featured Movie</h2>
          <button className="flex-3">
            <span>See more</span>
            <img src={ChevronRight} alt="icon" />
          </button>
        </div>
        <MovieList />
      </div>
    </section>
  );
};

export default Featured;
