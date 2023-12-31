import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MovieList from "./MovieList";
import { FaAngleRight } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";

const Featured = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, offset: 30, once: true });
  }, []);

  return (
    <section className="featured" data-aos="fade-right">
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
