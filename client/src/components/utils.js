import React from "react";
import { Link } from "react-router-dom";
import LogoIcon from "../icons/tv.png";
import LoaderGif from "../icons/myloader.gif";
import { FaRedo } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../context";

export const Logo = () => {
  return (
    <Link to={"/"} className="logo center">
      <img src={LogoIcon} alt="logo icon" />
      <span>MovieBox</span>
    </Link>
  );
};

export const Loader = () => {
  return (
    <article className="loader center">
      <img src={LoaderGif} alt="loader" />
    </article>
  );
};

export const Reload = () => {
  const { setReload, reload } = useGlobalContext();
  return (
    <section className="movie-loader center req">
      <div className="wrapper ">
        <button className="reload-btn" onClick={() => setReload(!reload)}>
          <FaRedo />
        </button>
        <h5>Reload</h5>
      </div>
    </section>
  );
};

export const Cancel = () => {
  const { setSearchTerm } = useGlobalContext();

  return (
    <button className="search-btn times" onClick={() => setSearchTerm("")}>
      <FaTimes />
    </button>
  );
};

export const Search = () => {
  return (
    <button className="search-btn ">
      <FaSearch />
    </button>
  );
};
