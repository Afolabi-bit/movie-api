import React, { useState, useContext, useEffect, createContext } from "react";

export const AppContext = createContext();

const url =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=f0757f1146ccbe0c1de0425e245dd645&page=1";

const baseUrl = "https://api.themoviedb.org/3/movie/";
const apiKey = "?api_key=f0757f1146ccbe0c1de0425e245dd645&page=1";

const searchUrl =
  'https://api.themoviedb.org/3/search/movie?api_key=f0757f1146ccbe0c1de0425e245dd645&query="';

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [movieId, setMovieId] = useState(0);
  const [movie, setMovie] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [requestFailed, setRequestFailed] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (movieId !== 0) {
      setLoading(true);
      fetch(`${baseUrl}${movieId}${apiKey}`)
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

  useEffect(() => {
    setLoading(true);
    fetch(`${searchUrl}${searchTerm}`)
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

  useEffect(() => {
    setLoading(true);
    fetch(url)
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
  }, [isSearching, reload]);

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
