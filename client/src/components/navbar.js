import React, { useEffect } from "react";
import { Logo, Cancel, Search } from "./utils";
import { useGlobalContext } from "../context";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setSearchTerm, searchTerm, isUserLoggedIn, currentUser } =
    useGlobalContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchTerm);
    window.scrollTo({
      top: 650,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    AOS.init({ duration: 1000, offset: 180 });
  }, []);

  return (
    <nav className="navbar" data-aos="fade-down">
      <div className="container flex-2">
        <Logo />
        <div className="form-wrapper">
          <form className="form flex" onSubmit={handleSubmit}>
            <input
              type="text"
              value={searchTerm}
              placeholder="What do you want to watch?"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            {searchTerm === "" && <Search />}
            {}
          </form>
          {searchTerm && <Cancel />}
        </div>

        {!isUserLoggedIn && (
          <Link to={"/signin"} className="signin center">
            <p>Sign in</p>
            <p className="ellipse"></p>
          </Link>
        )}
        {isUserLoggedIn && (
          <Link to={"/profile"} className="signin center">
            {currentUser.photoURL ? (
              <img className="user-img" src={currentUser.photoURL} />
            ) : (
              <img className="user-img" src="../icons/user.png" alt="user" />
            )}
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
