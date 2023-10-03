import { useEffect } from "react";
import { useGlobalContext } from "../context";
import play from "../icons/Play_poster.png";
import arrow from "../icons/ExpandArrow.png";
import rectangle from "../icons/Rectangle.png";
import Tickets from "../icons/Tickets.png";
import List from "../icons/List.png";
import Star from "../icons/Star.png";
import { Loader } from "../components/utils";
import { Link, useParams } from "react-router-dom";
import { Reload } from "../components/utils";
const SeriesData = () => {
  const { setSeriesId, series, loading, requestFailed } = useGlobalContext();
  const { id } = useParams();

  useEffect(() => {
    setSeriesId(id);
  }, [id]);

  const {
    poster_path: img,
    name,
    overview,
    first_air_date: date,
    genres,
    vote_average: rating,
    created_by,
    number_of_seasons: seasons,
    number_of_episodes: episodes,
    status,
    seasons: seasonsList,
  } = series;

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

  if (Object.keys(series) !== 0) {
    return (
      <section className="series movie-data">
        <div className="poster-wrapper">
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/original${img}`}
            alt="poster"
          />
          <div className="play-wrapper center">
            <img src={play} alt="icon" />
          </div>
        </div>

        <article className="details flex">
          <div className="text">
            <div className="dynamic-details flex">
              <p className="title">{name}</p>
              <p className="dot"></p>
              <p className="year">{date ? date.split("-")[0] : date}</p>
              <p className="dot"></p>
              <p className="pg">pg-13</p>
            </div>
            <p className="overview">{overview}</p>
            <div className="bottom">
              {created_by && (
                <p>
                  {`Created By : `}
                  <span>
                    {created_by.length > 0 &&
                      created_by.map((creator, index) => {
                        if (index === created_by.length - 1) {
                          return (
                            <Link to={"/person/:personID"} key={creator.id}>
                              {creator.name}
                            </Link>
                          );
                        }
                        return (
                          <Link to={"/person/:personID"} key={creator.id}>
                            {`${creator.name}, `}
                          </Link>
                        );
                      })}
                    {created_by.length < 1 && (
                      <span>{name} production team</span>
                    )}
                  </span>
                </p>
              )}
              <p>
                Seasons : <span>1 - {seasons}</span>
              </p>
              <p>
                Episodes : <span>{episodes}</span>
              </p>
              <p>
                Production Status : <span>{status}</span>
              </p>
              <div className="genres flex">
                {genres &&
                  genres.map((genre, index) => (
                    <span key={index} className="genre">
                      {genre.name}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          <div className="seasons-carousel">
            <div className="wrapper column">
              {seasonsList &&
                seasonsList.map((season) => {
                  const {
                    poster_path: url,
                    name,
                    overview,
                    episode_count: episodes,
                  } = season;
                  return (
                    <div key={season.id} className="season-card">
                      {url ? (
                        <img
                          src={`https://image.tmdb.org/t/p/original${url}`}
                          alt={name}
                        />
                      ) : (
                        <img
                          src={`https://image.tmdb.org/t/p/original${img}`}
                          alt={name}
                        />
                      )}
                      <h3>{name}</h3>
                      <p>Episodes: {episodes}</p>
                      <p>{overview}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </article>
      </section>
    );
  }
};

export default SeriesData;
