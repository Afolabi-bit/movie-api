import { Logo, Loader } from "../components/utils";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import AOS from "aos";
import MovieGrid from "../components/MovieGrid";
import "aos/dist/aos.css";

const Favourites = () => {
  const { favourites } = useGlobalContext();

  useEffect(() => {
    AOS.init({ duration: 1000, offset: 100, once: true });
  }, []);

  if (!favourites[0]) {
    return (
      <main className="categories-page">
        <Loader />
      </main>
    );
  }
  //   console.log(favourites);
  return (
    <main className="categories-page">
      <div className="logo-wrapper" data-aos="fade-down">
        <Logo />
        <div className="btn-wrapper">
          <button className="active">Favourites</button>
        </div>
      </div>
      <section className="categories container">
        {/* <MovieGrid movieList={favourites} /> */}
      </section>
    </main>
  );
};

export default Favourites;
