import React from "react";
import Card from "./card";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const MovieGrid = ({ movieList }) => {
  useEffect(() => {
    AOS.init({ duration: 300, offset: 30 });
  }, []);
  return (
    <article className="movieList" data-aos="zoom-out">
      {movieList.map((movie) => {
        return <Card key={movie.id} data={movie} animate={true} />;
      })}
    </article>
  );
};

export default MovieGrid;
