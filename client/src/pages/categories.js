import { Logo, Loader } from "../components/utils";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import AOS from "aos";
import MovieGrid from "../components/MovieGrid";
import "aos/dist/aos.css";

const Categories = () => {
  const {
    topRatedMovies,
    popularMovies,
    trendingMovies,
    nowPlaying,
    upcoming,
  } = useGlobalContext();

  useEffect(() => {
    AOS.init({ duration: 1000, offset: 100, once: true });
  }, []);

  const [page, setPage] = useState("Popular Movies");

  const selectTarget = (e) => {
    let btns = document.querySelectorAll(".logo-wrapper button");

    btns.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");

    setPage(e.target.innerHTML);
  };

  if (
    !topRatedMovies[1] &&
    !popularMovies[1] &&
    !trendingMovies[1] &&
    !nowPlaying &&
    !upcoming[1]
  ) {
    return (
      <main className="categories-page">
        <Loader />
      </main>
    );
  }

  return (
    <main className="categories-page">
      <div className="logo-wrapper" data-aos="fade-down">
        <Logo />
        <div className="btn-wrapper">
          <button className="active" onClick={(e) => selectTarget(e)}>
            Popular Movies
          </button>
          <button onClick={(e) => selectTarget(e)}>Top Rated</button>
          <button onClick={(e) => selectTarget(e)}>Trending</button>

          <button onClick={(e) => selectTarget(e)}>Now Playing</button>

          <button onClick={(e) => selectTarget(e)}>Upcoming</button>
        </div>
      </div>
      <section className="categories container">
        {page === "Popular Movies" && <MovieGrid movieList={popularMovies} />}
        {page === "Top Rated" && <MovieGrid movieList={topRatedMovies} />}
        {page === "Now Playing" && <MovieGrid movieList={nowPlaying} />}
        {page === "Trending" && <MovieGrid movieList={trendingMovies} />}
        {page === "Upcoming" && <MovieGrid movieList={upcoming} />}
      </section>
    </main>
  );
};
export default Categories;
