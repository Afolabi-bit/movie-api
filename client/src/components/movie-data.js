import { useEffect } from "react";
import { useGlobalContext } from "../context";
import play from "../icons/Play_poster.png";
import Star from "../icons/Star.png";
import { Loader, ReleaseDate } from "../components/utils";
import { useParams } from "react-router-dom";
import { Reload } from "../components/utils";
import Card from "./card";
import YouTube from "react-youtube";
import AOS from "aos";
import "aos/dist/aos.css";

const MovieData = () => {
  const {
    setMovieId,
    movie,
    loading,
    requestFailed,
    openYT,
    setOpenYT,
    nowPlaying: movieList,
  } = useGlobalContext();
  const { id } = useParams();

  useEffect(() => {
    setMovieId(id);
  }, [id, setMovieId]);

  useEffect(() => {
    AOS.init({ duration: 1000, offset: 180, once: true });
  }, []);

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
    popularity,
    spoken_languages: languages,
    tagline,
  } = movie;

  let min;
  runtime % 60 < 10 ? (min = `0${runtime % 60}`) : (min = runtime % 60);

  let youTubeKey;

  if (loading) {
    return (
      <section className="movie-loader movie-data center">
        <Loader />
      </section>
    );
  }

  if (requestFailed) {
    return <Reload />;
  }

  if (Object.keys(movie) !== 0 && videos) {
    videos.results.forEach((video) => {
      if (video.type === "Trailer") {
        youTubeKey = video.key;
      }
    });

    return (
      <section className="movie-data" data-aos="fade-left">
        <div className="poster-wrapper" data-aos="zoom-in">
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
              <p className="dot"></p>

              <div className="star flex-3">
                <img src={Star} alt="icon" />
                <p>
                  <span>{rating ? rating.toFixed(1) : rating}</span> |{" "}
                  {popularity && `${popularity.toFixed(0)}k`}
                </p>
              </div>
            </div>
            <p className="overview">{overview}</p>
            <div className="bottom">
              <p>
                Tagline : <span>{tagline}</span>
              </p>
              <p>
                Release Date : <ReleaseDate date={date} type={"long"} />
              </p>
              <p>
                {`Spoken Languages: `}
                {languages[0] &&
                  languages.map((lang, index) => {
                    if (+index !== languages.length - 1) {
                      return (
                        <span key={index}>{`${lang.english_name}, `}</span>
                      );
                    }
                    return <span key={index}>{lang.english_name}</span>;
                  })}
              </p>
              <p>
                {`Genres: `}
                {genres[0] &&
                  genres.map((genre, index) => {
                    if (+index !== genre.length - 1) {
                      return <span key={index}>{`${genre.name}, `}</span>;
                    }
                    return <span key={index}>{genre.name}</span>;
                  })}
              </p>
            </div>
          </div>
          {movieList && (
            <aside className="more-movies-aside">
              <h3>More movies for you: </h3>
              <article className="more-movies" data-aos="zoom-in-down">
                {movieList.map((movie) => {
                  return <Card key={movie.id} {...movie} animate={false} />;
                })}
              </article>
            </aside>
          )}
        </article>
      </section>
    );
  }
};

export default MovieData;
