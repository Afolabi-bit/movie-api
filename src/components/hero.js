import React from "react";
import Play from "../icons/play.png";
import Imdb from "../icons/imdb.png";
import RT from "../icons/rotten_tomatoes.png";

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-text ">
          <h1>John Wick 3 : Parabellum</h1>
          <div className="rating flex">
            <p className="flex">
              <img src={Imdb} alt="imdb icon" />
              <span>86.0/100</span>
            </p>
            <p className="flex">
              <img src={RT} alt="rotten tomatoes logo" />
              <span>97%</span>
            </p>
          </div>
          <p className="text">
            John Wick is on the run after killing a member of the international
            assassins' guild, and with a $14 million price tag on his head, he
            is the target of hit men and women everywhere.
          </p>
          <button className="hero-btn center">
            <img src={Play} alt="icon" />
            <span>Watch trailer</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
