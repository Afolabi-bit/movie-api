import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaImdb, FaRankingStar } from "react-icons/fa6";
import Play from "../icons/play.png";
import { useGlobalContext } from "../context";
import AOS from "aos";
import "aos/dist/aos.css";

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, offset: 180 });
  }, []);
  const { nowPlaying } = useGlobalContext();
  if (nowPlaying[15]) {
    let {
      id,
      title,
      vote_average: rating,
      popularity,
      overview,
    } = nowPlaying[15];
    return (
      <section className="hero" data-aos="fade-up">
        <div className="container">
          <div className="hero-text ">
            <h1>{title}</h1>
            <div className="rating flex">
              <p className="flex imdb">
                <FaImdb />
                <span>{rating}/10</span>
              </p>
              <p className="popularity flex">
                <FaRankingStar />
                <span>{popularity.toFixed(2)}</span>
              </p>
            </div>
            <p className="text">
              {overview.length < 200
                ? overview
                : `${overview.substring(0, 200)}...`}
            </p>
            <Link to={`/movies/${id}`} className="hero-btn center">
              <img src={Play} alt="icon" />
              <span>Watch trailer</span>
            </Link>
          </div>
        </div>
      </section>
    );
  }
};

export default Hero;
