import React from "react";
import { Logo, Cancel, Search } from "./utils";
import { useGlobalContext } from "../context";

const Navbar = () => {
  const { setSearchTerm, searchTerm } = useGlobalContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchTerm);
  };

  return (
    <nav className="navbar">
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
