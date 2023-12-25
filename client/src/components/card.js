import { Link } from "react-router-dom";
import { FaImdb, FaRankingStar, FaHeart } from "react-icons/fa6";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ReleaseDate } from "./utils";

const Card = ({
  id,
  poster_path: url,
  title,
  release_date: date,
  vote_average: rating,
  popularity: rtrating,
  animate,
}) => {
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
              {title.length > 20 ? `${title.substring(0, 20)}...` : title}
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

export const SeriesCard = ({
  id,
  poster_path: url,
  first_air_date: date,
  name: title,
  vote_average: rating,
  popularity: rtrating,
}) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month;

  if (id && url && title && rating && date && rtrating) {
    const monthCode = date.split("-")[1].split("");
    if (monthCode[0] < 1) {
      month = monthCode[1] - 1;
    } else {
      month = date.split("-")[1] - 1;
    }

    return (
      <Link to={`/series/${id}`} className="card" data-aos="zoom-in-up">
        <img src={`https://image.tmdb.org/t/p/original${url}`} alt="poster" />
        <div className="wrapper">
          <p className="mobile">{`TV - ${months[month]} ${
            date.split("-")[2]
          }, ${date.split("-")[0]}`}</p>
          <h3>{title}</h3>
          <div className="ratings flex-2">
            <p className="flex">
              <FaImdb />
              <span>{rating ? rating.toFixed(1) : rating}/10</span>
            </p>
            <p className="flex">
              <FaRankingStar />
              <span>{rtrating.toFixed(1)}</span>
            </p>
          </div>
        </div>
      </Link>
    );
  }
};

export const PersonCard = ({
  id,
  name,
  gender,
  known_for_department: department,
  profile_path: url,
}) => {
  return (
    <Link to={`/person/${id}`} className="person-card" data-aos="zoom-in-up">
      <img src={`https://image.tmdb.org/t/p/original${url}`} alt="poster" />
      <div className="wrapper">
        <h3>{name}</h3>
        <p>{gender > 1 ? "Male" : "Female"}</p>
        <p>{department}</p>
      </div>
    </Link>
  );
};

export default Card;
