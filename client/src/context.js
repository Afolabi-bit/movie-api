import React, {
  useState,
  useContext,
  useEffect,
  createContext,
  useCallback,
} from "react";

export const AppContext = createContext();

const trendingMovie = "https://api.themoviedb.org/3/trending/movie/day";
const baseUrl = "https://api.themoviedb.org/3/movie/";
const searchUrl = "https://api.themoviedb.org/3/search/movie";
const apiKey = "?api_key=f0757f1146ccbe0c1de0425e245dd645";
const topRatedMoviesUrl = "https://api.themoviedb.org/3/movie/top_rated";
const popularMoviesUrl = "https://api.themoviedb.org/3/discover/movie";
const trendingMovieUrl = "https://api.themoviedb.org/3/trending/movie/day";
const nowPlayingUrl = "https://api.themoviedb.org/3/movie/now_playing";
const upcomingUrl = "https://api.themoviedb.org/3/movie/upcoming";

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [movieId, setMovieId] = useState(null);
  const [movie, setMovie] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [requestFailed, setRequestFailed] = useState(false);
  const [reload, setReload] = useState(false);
  const [openYT, setOpenYT] = useState(true);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [currentUser, setCurrentUser] = useState(null);

  /** Movie data */

  useEffect(() => {
    if (movieId !== null) {
      setLoading(true);
      fetch(`${baseUrl}${movieId}${apiKey}&append_to_response=videos`)
        .then((res) => res.json())
        .then((data) => {
          setMovie(data);
          setOpenYT(false);
          setRequestFailed(false);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setRequestFailed(true);
          setOpenYT(false);
        });
    }
  }, [movieId, reload]);

  /** Search  */
  useEffect(() => {
    setLoading(true);
    fetch(`${searchUrl}${apiKey}&query=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        setMovieList(data.results);
        setRequestFailed(false);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setRequestFailed(true);
      });
    setLoading(false);
    // if (searchTerm === "") {
    //   setIsSearching(!isSearching);
    // }
  }, [searchTerm]);

  /** On load data */

  useEffect(() => {
    setLoading(true);
    fetch(`${trendingMovie}${apiKey}&page=${pageNo}`)
      .then((res) => res.json())
      .then((data) => {
        setMovieList(data.results);
        setRequestFailed(false);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setRequestFailed(true);
      });

    setLoading(false);
  }, [isSearching, reload, pageNo]);

  /** Top Rated Movies */

  useEffect(() => {
    fetch(`${topRatedMoviesUrl}${apiKey}&page=${pageNo}`)
      .then((res) => res.json())
      .then((data) => {
        setTopRatedMovies(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pageNo]);

  /** Popular Movies */
  const getpopularMovies = useCallback(() => {
    fetch(`${popularMoviesUrl}${apiKey}&page=${pageNo}`)
      .then((res) => res.json())
      .then((data) => {
        setPopularMovies(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pageNo]);

  useEffect(getpopularMovies);

  /** Trending Today */

  useEffect(() => {
    fetch(`${trendingMovieUrl}${apiKey}&page=${pageNo}`)
      .then((res) => res.json())
      .then((data) => {
        setTrendingMovies(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pageNo]);

  /** Now Playing */
  useEffect(() => {
    fetch(`${nowPlayingUrl}${apiKey}&page=${pageNo}`)
      .then((res) => res.json())
      .then((data) => {
        setNowPlaying(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pageNo]);

  /** Upcoming */
  useEffect(() => {
    fetch(`${upcomingUrl}${apiKey}&page=${pageNo}`)
      .then((res) => res.json())
      .then((data) => {
        setUpcoming(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pageNo]);

  return (
    <AppContext.Provider
      value={{
        loading,
        searchTerm,
        setSearchTerm,
        movieList,
        movieId,
        setMovieId,
        movie,
        requestFailed,
        reload,
        setReload,
        setIsSearching,
        pageNo,
        setPageNo,
        topRatedMovies,
        popularMovies,
        trendingMovies,
        nowPlaying,
        upcoming,
        openYT,
        setOpenYT,
        newUser,
        setNewUser,
        currentUser,
        setCurrentUser,
        signInData,
        setSignInData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
