import React from "react";
import Play from "../icons/play.png";
import Imdb from "../icons/imdb.png";
import RT from "../icons/rotten_tomatoes.png";
import { useGlobalContext } from "../context";

const Hero = ({ movie }) => {
  const { nowPlaying } = useGlobalContext();
  if (nowPlaying[15]) {
    let { title, vote_average: rating, popularity, overview } = nowPlaying[15];
    return (
      <section className="hero">
        <div className="container">
          <div className="hero-text ">
            <h1>{title}</h1>
            <div className="rating flex">
              <p className="flex">
                <img src={Imdb} alt="imdb icon" />
                <span>{rating}/10</span>
              </p>
              <p className="flex">
                <img src={RT} alt="rotten tomatoes logo" />
                <span>{popularity.toFixed(1)}</span>
              </p>
            </div>
            <p className="text">{`${overview.substring(0, 200)}...`}</p>
            <button className="hero-btn center">
              <img src={Play} alt="icon" />
              <span>Watch trailer</span>
            </button>
          </div>
        </div>
      </section>
    );
  }
};

export default Hero;
