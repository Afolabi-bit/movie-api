import { Link } from "react-router-dom";
import Imdb from "../icons/imdb.png";
import RT from "../icons/rotten_tomatoes.png";
import { useGlobalContext } from "../context";

const Card = ({
  id,
  poster_path: url,
  title,
  vote_average: rating,
  release_date: date,
  popularity: rtrating,
}) => {
  if (id && url && title && rating && date && rtrating) {
    return (
      <Link to={`/movies/${id}`} className="card">
        <img src={`https://image.tmdb.org/t/p/original${url}`} alt="poster" />
        <div className="wrapper">
          <p className="date">{date.split("-")[0]}</p>
          <h3>{title}</h3>
          <div className="ratings flex-2">
            <p className="flex">
              <img className="imdb" src={Imdb} alt="imdb icon" />
              <span>{rating}/100</span>
            </p>
            <p className="flex">
              <img className="rt" src={RT} alt="rotten tomatoes icon" />
              <span>{rtrating.toFixed(1)}</span>
            </p>
          </div>
        </div>
      </Link>
    );
  }
};

export default Card;
