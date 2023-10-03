import { Logo } from "../components/utils";
import { useGlobalContext } from "../context";
import { useRef } from "react";
import Carousel from "../components/Carousel";
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

  return (
    <main className="categories-page">
      <Logo />
      <section className="categories container">
        <div className="line"></div>

        <article className="now-playing">
          <div className="flex category-title center">
            <h3>Now Playing</h3>
            <FaCirclePlay />
          </div>
          <div className="catalogue">
            <h5>Movies</h5>
            <Carousel movieList={nowPlaying} type={"movie"} />
          </div>
        </article>
        <article className="upcoming">
          <div className="flex category-title center">
            <h3>Upcoming</h3>
            <FaCirclePlay />
          </div>
          <div className="catalogue">
            <h5>Movies</h5>
            <Carousel movieList={upcoming} type={"movie"} />
          </div>
        </article>

        <article className="trending">
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

        <article className="discover">
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

        <article className="top-rated">
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
