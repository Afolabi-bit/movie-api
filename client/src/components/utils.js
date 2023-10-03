import React from "react";
import { Link } from "react-router-dom";
import LogoIcon from "../icons/tv.png";
import LoaderGif from "../icons/myloader.gif";
import { FaRedo, FaSearch, FaTimes } from "react-icons/fa";
import {
  FaAngleLeft,
  FaAnglesLeft,
  FaAngleRight,
  FaAnglesRight,
} from "react-icons/fa6";
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

export const Pagination = () => {
  const { pageNo, setPageNo } = useGlobalContext();

  const previousPage = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };
  const nextPage = () => {
    if (pageNo < 10) {
      setPageNo(pageNo + 1);
    }
  };
  const firstPage = () => {
    setPageNo(1);
  };
  const lastPage = () => {
    setPageNo(10);
  };

  return (
    <div className="pagination-btn center">
      {pageNo > 1 && (
        <button className="first-page" onClick={() => firstPage()}>
          <FaAnglesLeft />
        </button>
      )}
      <button className="previous-page" onClick={() => previousPage()}>
        <FaAngleLeft />
      </button>
      <p className="page-no">{pageNo}</p>
      <button className="next-page" onClick={() => nextPage()}>
        <FaAngleRight />
      </button>
      {pageNo > 1 && (
        <button className="next-page" onClick={() => lastPage()}>
          <FaAnglesRight />
        </button>
      )}
    </div>
  );
};
