import React from "react";
import { Link } from "react-router-dom";
import MovieList from "./MovieList";
import { FaAngleRight } from "react-icons/fa6";

import { useGlobalContext } from "../context";

const Featured = () => {
  const { loading } = useGlobalContext();

  return (
    <section className="featured">
      <div className="container">
        <div className="title flex-2">
          <h2>Featured Movie</h2>
          <Link to={"/categories"} className="flex-3">
            <span>See more</span>
            <FaAngleRight />
          </Link>
        </div>
        <MovieList />
      </div>
    </section>
  );
};

export default Featured;
