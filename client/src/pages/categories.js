import { Logo, Loader } from "../components/utils";
import React, { useEffect } from "react";
import { useGlobalContext } from "../context";
import Carousel from "../components/Carousel";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaArrowUp,
  FaSearchengin,
  FaFireFlameCurved,
  FaCirclePlay,
} from "react-icons/fa6";

const Categories = () => {
  const {
    topRatedMovies,
    topRatedTV,
    popularMovies,
    trendingMovies,
    trendingTV,
    trendingPerson,
    nowPlaying,
    upcoming,
    popularTV,
  } = useGlobalContext();

  useEffect(() => {
    AOS.init({ duration: 1000, offset: 100, once: true });
  }, []);
  if (
    !topRatedMovies[1] &&
    !topRatedTV[1] &&
    !popularMovies[1] &&
    !trendingMovies[1] &&
    !trendingTV[1] &&
    !trendingPerson[1] &&
    !nowPlaying &&
    !upcoming[1] &&
    !popularTV[1]
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
      </div>
      <section className="categories container">
        <div className="line" data-aos="fade-right"></div>

        <article className="now-playing" data-aos="fade-right">
          <div className="flex category-title center">
            <h3>Now Playing</h3>
            <FaCirclePlay />
          </div>
          <div className="catalogue">
            <h5>Movies</h5>
            <div data-aos="fade-left">
              <Carousel movieList={nowPlaying} type={"movie"} />
            </div>
          </div>
        </article>
        <article className="upcoming" data-aos="fade-right">
          <div className="flex category-title center">
            <h3>Upcoming</h3>
            <FaCirclePlay />
          </div>
          <div className="catalogue">
            <h5>Movies</h5>
            <Carousel movieList={upcoming} type={"movie"} />
          </div>
        </article>

        <article className="trending" data-aos="fade-right">
          <div className="flex category-title center">
            <h3>Trending</h3>
            <FaFireFlameCurved />
          </div>
          <div className="catalogue">
            <h5>Movies</h5>
            <Carousel movieList={trendingMovies} type={"movie"} />
          </div>
          <div className="catalogue">
            <h5>TV Series</h5>
            <Carousel movieList={trendingTV} type={"series"} />
          </div>

          <div className="catalogue">
            <h5>People</h5>
            <Carousel movieList={trendingPerson} type={""} />
          </div>
        </article>

        <article className="discover" data-aos="fade-right">
          <div className="flex category-title center">
            <h3>Discover</h3>
            <FaSearchengin />
          </div>
          <div className="catalogue">
            <h5>Movies</h5>
            <Carousel movieList={popularMovies} type={"movie"} />
          </div>
          <div className="catalogue">
            <h5>TV Series</h5>
            <Carousel movieList={popularTV} type={"series"} />
          </div>
        </article>

        <article className="top-rated" data-aos="fade-right">
          <div className="flex category-title center">
            <h3>Top Rated</h3>
            <FaArrowUp />
          </div>
          <div className="catalogue">
            <h5>Movies</h5>
            <Carousel movieList={topRatedMovies} type={"movie"} />
          </div>
          <div className="catalogue">
            <h5>TV Series</h5>
            <Carousel movieList={topRatedTV} type={"series"} />
          </div>
        </article>
      </section>
    </main>
  );
};
export default Categories;
