import { useEffect } from "react";
import { useGlobalContext } from "../context";
import play from "../icons/Play_poster.png";
import arrow from "../icons/ExpandArrow.png";
import rectangle from "../icons/Rectangle.png";
import Tickets from "../icons/Tickets.png";
import List from "../icons/List.png";
import Star from "../icons/Star.png";
import { Loader } from "../components/utils";
import { useParams } from "react-router-dom";
import { Reload } from "../components/utils";
import YouTube from "react-youtube";

const MovieData = () => {
  const { setMovieId, movie, loading, requestFailed, openYT, setOpenYT } =
    useGlobalContext();
  const { id } = useParams();

  useEffect(() => {
    setMovieId(id);
  }, [id]);

  const {
    adult,
    poster_path: img,
    title,
    overview,
    release_date: date,
    runtime,
    genres,
    vote_average: rating,
    videos,
  } = movie;
  let min;
  runtime % 60 < 10 ? (min = `0${runtime % 60}`) : (min = runtime % 60);

  let youTubeKey;

  if (loading) {
    return (
      <section className="movie-loader center">
        <Loader />
      </section>
    );
  }

  if (requestFailed) {
    return <Reload />;
  }

  if (Object.keys(movie) !== 0 && videos) {
    console.log(videos.results);
    videos.results.forEach((video) => {
      if (video.type === "Trailer") {
        youTubeKey = video.key;
      }
    });
    return (
      <section className="movie-data">
        <div className="poster-wrapper">
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/original${img}`}
            alt="poster"
          />
          <button
            onClick={() => setOpenYT(true)}
            className="play-wrapper center"
          >
            <img src={play} alt="icon" />
          </button>

          {openYT && (
            <div className="yt">
              <YouTube videoId={youTubeKey} />
            </div>
          )}
        </div>

        <article className="details flex">
          <div className="text">
            <div className="dynamic-details flex">
              <p className="title">{title}</p>
              <p className="dot"></p>
              <p className="year">{date ? date.split("-")[0] : date}</p>
              <p className="dot"></p>
              <p className="pg">{adult ? "Rated: R" : "PG-13"}</p>
              <p className="dot"></p>
              <p>{`${Math.trunc(runtime / 60)}h ${min}m`}</p>
            </div>
            <p className="overview">{overview}</p>
            <div className="bottom">
              <p>
                Director : <span> Joseph Kosinski</span>
              </p>
              <p>
                Writers : <span>Jim Cash, Jack Epps Jr, Peter Craig</span>
              </p>
              <p>
                Stars : <span>Tom Cruise, Jennifer Connelly, Miles Teller</span>
              </p>
              <div className="genres flex">
                {genres &&
                  genres.map((genre, index) => (
                    <span key={index} className="genre">
                      {genre.name}
                    </span>
                  ))}
              </div>
              <div className="flex-2">
                <div className="flex-3">
                  <button>Top Rated Movie #65</button>
                  <button>Awards 9 Nominations</button>
                </div>
                <img src={arrow} alt="icon" />
              </div>
            </div>
          </div>

          <div className="imgs column">
            <div className="star flex-3">
              <img src={Star} alt="icon" />
              <p>
                <span>{rating ? rating.toFixed(1) : rating}</span> | 350k
              </p>
            </div>
            <div className="btns column">
              <button className="center">
                <img src={Tickets} alt="icon" />
                See Showtimes
              </button>
              <button className="center">
                <img src={List} alt="icon" />
                More watch options
              </button>
            </div>
            <img src={rectangle} alt="image" />
          </div>
        </article>
      </section>
    );
  }
};

export default MovieData;
