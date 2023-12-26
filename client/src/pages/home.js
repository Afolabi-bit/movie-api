import React from "react";
import { useGlobalContext } from "../context";
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Featured from "../components/featured";

const Home = () => {
  const { nowPlaying } = useGlobalContext();

  let url;
  if (nowPlaying[15]) {
    url = `https://image.tmdb.org/t/p/original${nowPlaying[15].poster_path}`;
  }
  return (
    <main>
      <section
        className="hero-wrapper"
        style={{
          backgroundImage: `url(${url})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
          backgroundPosition: "top center",
        }}
      >
        <Navbar />
        <Hero />
      </section>
      <Featured />
    </main>
  );
};

export default Home;
