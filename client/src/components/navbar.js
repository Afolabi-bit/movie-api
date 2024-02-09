import React, { useEffect } from "react";
import { Logo, Cancel, Search } from "./utils";
import { useGlobalContext } from "../context";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { auth } from "../server/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const { setSearchTerm, searchTerm, currentUser, setCurrentUser } =
    useGlobalContext();

  const getUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  };
  getUser();

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

        {currentUser && (
          <Link to={"/profile"} className="profile-pic center">
            {currentUser.photoURL && (
              <img src={currentUser.photoURL} alt="icon" />
            )}
            {!currentUser.photoURL && (
              <img
                src="https://res.cloudinary.com/dkpoealta/image/upload/v1707479803/user_yposbw.png"
                alt=""
              />
            )}
          </Link>
        )}

        {!currentUser && (
          <Link to={"/signin"} className="signin center">
            <p>Sign in</p>
            <p className="ellipse"></p>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
