import { Link, useNavigate } from "react-router-dom";
import { FaImdb, FaRankingStar, FaHeart } from "react-icons/fa6";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ReleaseDate } from "./utils";
import { useGlobalContext } from "../context";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../server/firebaseConfig";

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

  const { currentUser, favourites } = useGlobalContext();

  /**
   * The functionality for adding
   * movies to favourites.
   */
  const favouritesCollectionRef = collection(db, "favourites");
  const addFavourite = async (arg) => {
    try {
      await addDoc(favouritesCollectionRef, {
        id: arg.id,
        date: arg.date,
        popularity: arg.popularity,
        poster: arg.url,
        rating: arg.rating,
        title: arg.title,
        uid: arg.uid,
      });
    } catch (error) {
      console.error(error);
    }
  };

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

  // const getFavourites = async () => {
  //   try {
  //     const data = await getDocs(favouritesCollectionRef);
  //     const filteredData = data.docs.map((doc) => ({
  //       ...doc.data(),
  //       docId: doc.id,
  //     }));
  //     setFavourites(filteredData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const toggleFavourites = (e) => {
    let card = e.target.parentElement;

    if (card.classList.contains("selected")) {
      card.classList.remove("selected");
    } else {
      card.classList.add("selected");
      addMovieToFavourite();
    }
  };

  const [isFavourite, setIsFavourite] = useState(false);
  useEffect(() => {
    favourites.map((fave) => {
      if (fave.title === title) {
        setIsFavourite(true);
        return;
      }
    }, []);
  });
  if (
    id &&
    url &&
    title &&
    rating &&
    date &&
    rtrating &&
    favourites.length !== 0
  ) {
    return (
      <div
        className={`${isFavourite ? "selected card" : "card"}`}
        data-aos={animate && "zoom-in-up"}
      >
        <button
          onClick={(e) => toggleFavourites(e)}
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

  // if (
  //   id &&
  //   url &&
  //   title &&
  //   rating &&
  //   date &&
  //   rtrating &&
  //   favourites.length === 0
  // ) {
  //   return (
  //     <div className="card" data-aos={animate && "zoom-in-up"}>
  //       <button
  //         onClick={(e) => toggleFavourites(e)}
  //         className="fave-btn"
  //         id="fave-btn"
  //       >
  //         <FaHeart />
  //       </button>

  //       <Link className="link" to={`/movies/${id}`}>
  //         <img src={`https://image.tmdb.org/t/p/original${url}`} alt="poster" />
  //         <div className="wrapper">
  //           <ReleaseDate date={date} type={"short"} />
  //           <h3>
  //             {title.length > 28 ? `${title.substring(0, 28)}...` : title}
  //           </h3>
  //           <div className="ratings flex-2">
  //             <p className="flex imdb">
  //               <FaImdb />

  //               <span>{rating ? rating.toFixed(1) : rating}/10</span>
  //             </p>
  //             <p className="flex popularity">
  //               <FaRankingStar />
  //               <span>{rtrating.toFixed(1)}</span>
  //             </p>
  //           </div>
  //         </div>
  //       </Link>
  //     </div>
  //   );
  // }
};

export default Card;
