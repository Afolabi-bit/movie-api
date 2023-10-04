import Card from "./card";
import { useGlobalContext } from "../context";
import { Loader, Reload, Pagination } from "../components/utils";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const MovieList = () => {
  const { searchTerm, loading, movieList, requestFailed, pageNo, setPageNo } =
    useGlobalContext();

  useEffect(() => {
    AOS.init({ duration: 1000, offset: 180 });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (requestFailed) {
    return <Reload />;
  }

  if (movieList.length < 1 && searchTerm !== "") {
    return (
      <div className="center no-match" data-aos="fade-up">
        <div>
          <h2>Oops! No movie matched your search</h2>
          <p>Please check and try again.</p>
        </div>
      </div>
    );
  }

  if (movieList.length < 1) {
    return (
      <div className="center no-match" data-aos="fade-up">
        <div>
          <h2>No movies to display</h2>
          <p>Please check your internet connection.</p>
        </div>
      </div>
    );
  }

  if (movieList.length > 0) {
    return (
      <>
        <article className="movieList" data-aos="fade-left">
          {movieList.map((movie) => {
            return <Card key={movie.id} {...movie} />;
          })}
        </article>
        <Pagination />
      </>
    );
  }
};

export default MovieList;
