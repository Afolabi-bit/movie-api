import { Link, useNavigate } from "react-router-dom";
import { FaImdb, FaRankingStar, FaHeart } from "react-icons/fa6";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ReleaseDate } from "./utils";
import dbFunc from "../server/dataBase";
import { useGlobalContext } from "../context";

const Card = ({ data, animate }) => {
  const navigateTo = useNavigate();

  const {
    id,
    poster_path: url,
    title,
    release_date: date,
    vote_average: rating,
    popularity: rtrating,
  } = data;

  useEffect(() => {
    AOS.init({ duration: 1000, offset: 30 });
  }, []);

  const { currentUser } = useGlobalContext();

  /**
   * The functionality for adding
   * movies to favourites.
   */
  const { addFavourite } = dbFunc(); //Import and initialzation of function that cconnects db

  const addMovieToFavourite = () => {
    // A variable to temporarily hold the user ID
    let thisUserId;

    // Check for a signed in user
    if (currentUser === null) {
      // If no user is signed in, redirect to signin page
      navigateTo("/signin");
    } else {
      thisUserId = currentUser.uid;
    }

    // data object sent to db
    let newMovie = {
      id,
      date,
      url,
      popularity: rtrating,
      rating,
      title,
      uid: thisUserId,
    };

    addFavourite(newMovie); //data sent to db here
  };

  if (id && url && title && rating && date && rtrating) {
    return (
      <div className="card" data-aos={animate && "zoom-in-up"}>
        <button
          onClick={() => addMovieToFavourite()}
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
