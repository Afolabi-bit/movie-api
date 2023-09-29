import React from "react";
import { Link } from "react-router-dom";
import wall from "../icons/wall.gif";
import { Logo } from "../components/utils";

const Error = () => {
  return (
    <main className="error-page flex-2">
      <Logo />
      <div className="text">
        <h1>
          Oh! Snap, <br /> it looks like we're at a dead end!
        </h1>
        <p>
          Let's go <Link to={"/"}>back home</Link>
        </p>
      </div>
      <div className="img">
        <img src={wall} alt="" />
      </div>
    </main>
  );
};

export default Error;
