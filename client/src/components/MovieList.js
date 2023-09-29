import Card from "./card";
import { useGlobalContext } from "../context";
import { Loader } from "../components/utils";
import { Reload } from "../components/utils";

const MovieList = () => {
  const { searchTerm, loading, movieList, requestFailed } = useGlobalContext();

  if (loading) {
    return <Loader />;
  }

  if (requestFailed) {
    return <Reload />;
  }

  if (movieList.length < 1 && searchTerm !== "") {
    return (
      <div className="center no-match">
        <div>
          <h2>Oops! No movie matched your search</h2>
          <p>Please check and try again.</p>
        </div>
      </div>
    );
  }

  if (movieList.length < 1) {
    return (
      <div className="center no-match">
        <div>
          <h2>No movies to display</h2>
          <p>Please check your internet connection.</p>
        </div>
      </div>
    );
  }
  if (movieList.length > 0) {
    return (
      <article className="movieList">
        {movieList.map((movie) => {
          return <Card key={movie.id} {...movie} />;
        })}
      </article>
    );
  }
};

export default MovieList;
