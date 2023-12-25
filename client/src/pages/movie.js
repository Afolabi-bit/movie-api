import Sidebar from "../components/sidebar";
import MovieData from "../components/movie-data";

const Movie = () => {
  return (
    <main className="movie flex">
      <Sidebar type={"movie"} />
      <MovieData />
    </main>
  );
};

export default Movie;
