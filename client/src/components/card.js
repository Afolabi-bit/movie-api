import { Link } from "react-router-dom";
import { FaImdb, FaRankingStar, FaHeart } from "react-icons/fa6";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ReleaseDate } from "./utils";

const Card = ({ data, animate }) => {
  const {
    id,
    poster_path: url,
    title,
    release_date: date,
    vote_average: rating,
    popularity: rtrating,
  } = data;

  // const id = data.id;
  // const url = data.poster_path;
  // const title = data.title;
  // const date = data.release_date;
  // const rating = data.vote_average;
  // const rtrating = data.popularity;

  useEffect(() => {
    AOS.init({ duration: 1000, offset: 30 });
  }, []);

  const addToFavourites = (e) => {
    e.target.classList.toggle("selected");
  };

  if (id && url && title && rating && date && rtrating) {
    return (
      <div className="card" data-aos={animate && "zoom-in-up"}>
        <button
          onClick={(e) => addToFavourites(e)}
          className="fave-btn"
          id="fave-btn"
        >
          <FaHeart />
        </button>

        <Link className="link" to={`/movies/${id}`}>
          <img src={`https://image.tmdb.org/t/p/original${url}`} alt="poster" />
          <div className="wrapper">
            <ReleaseDate date={date} type={"short"} />
            <h3>
              {title.length > 28 ? `${title.substring(0, 28)}...` : title}
            </h3>
            <div className="ratings flex-2">
              <p className="flex imdb">
                <FaImdb />

                <span>{rating ? rating.toFixed(1) : rating}/10</span>
              </p>
              <p className="flex popularity">
                <FaRankingStar />
                <span>{rtrating.toFixed(1)}</span>
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
};

export default Card;
