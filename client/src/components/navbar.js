import React, { useEffect } from "react";
import { Logo, Cancel, Search } from "./utils";
import { useGlobalContext } from "../context";
import AOS from "aos";
import "aos/dist/aos.css";

const Navbar = () => {
  const { setSearchTerm, searchTerm } = useGlobalContext();
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

        <button className="signin center">
          <p>Sign in</p>
          <p className="ellipse"></p>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
