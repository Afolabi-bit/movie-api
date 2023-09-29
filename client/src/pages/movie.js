import React, { useEffect } from "react";
import Sidebar from "../components/sidebar";
import MovieData from "../components/movie-data";

const Movie = () => {
  return (
    <main className="movie flex">
      <Sidebar />
      <MovieData />
    </main>
  );
};

export default Movie;
