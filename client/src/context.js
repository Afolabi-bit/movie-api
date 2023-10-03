import React, { useState, useContext, useEffect, createContext } from "react";
import axios from "axios";

export const AppContext = createContext();

const trendingMovie = "https://api.themoviedb.org/3/trending/movie/day";
const baseUrl = "https://api.themoviedb.org/3/movie/";
const searchUrl = "https://api.themoviedb.org/3/search/movie";
const apiKey = "?api_key=f0757f1146ccbe0c1de0425e245dd645";
const topRatedMoviesUrl = "https://api.themoviedb.org/3/movie/top_rated";
const topRatedTVUrl = "https://api.themoviedb.org/3/tv/top_rated";
const popularMoviesUrl = "https://api.themoviedb.org/3/discover/movie";
const popularTVUrl = "https://api.themoviedb.org/3/discover/tv";
const trendingMovieUrl = "https://api.themoviedb.org/3/trending/movie/day";
const trendingTVUrl = "https://api.themoviedb.org/3/trending/tv/day";
const trendingPersonUrl = "https://api.themoviedb.org/3/trending/person/day";
const nowPlayingUrl = "https://api.themoviedb.org/3/movie/now_playing";

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);
  const [trendingPerson, setTrendingPerson] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [movieId, setMovieId] = useState(0);
  const [movie, setMovie] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [requestFailed, setRequestFailed] = useState(false);
  const [reload, setReload] = useState(false);

  /** Movie data */

  useEffect(() => {
    if (movieId !== 0) {
      setLoading(true);
      fetch(`${baseUrl}${movieId}${apiKey}&page=1`)
        .then((res) => res.json())
        .then((data) => {
          setMovie(data);
          setRequestFailed(false);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setRequestFailed(true);
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
    if (searchTerm === "") {
      setIsSearching(!isSearching);
    }
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

  /** Top Rated Series */

  useEffect(() => {
    fetch(`${topRatedTVUrl}${apiKey}&page=${pageNo}`)
      .then((res) => res.json())
      .then((data) => {
        setTopRatedTV(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
  }, []);

  /** Popular Movies */

  useEffect(() => {
    fetch(`${popularMoviesUrl}${apiKey}&page=${pageNo}`)
      .then((res) => res.json())
      .then((data) => {
        setPopularMovies(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /** POpular Series */

  useEffect(() => {
    fetch(`${popularTVUrl}${apiKey}&page=${pageNo}`)
      .then((res) => res.json())
      .then((data) => {
        setPopularTV(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
  }, []);

  useEffect(() => {
    fetch(`${trendingTVUrl}${apiKey}&page=${pageNo}`)
      .then((res) => res.json())
      .then((data) => {
        setTrendingTV(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch(`${trendingPersonUrl}${apiKey}&page=${pageNo}`)
      .then((res) => res.json())
      .then((data) => {
        setTrendingPerson(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
  }, []);

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
        topRatedTV,
        popularMovies,
        popularTV,
        trendingMovies,
        trendingTV,
        trendingPerson,
        nowPlaying,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
