import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import wall from "../icons/wall.gif";
import { Logo } from "../components/utils";
import AOS from "aos";
import "aos/dist/aos.css";

const Error = () => {
  useEffect(() => {
    AOS.init({ duration: 700, offset: 20, once: true });
  }, []);
  return (
    <main className="error-page ">
      <div className="logo-wrapper" data-aos="fade-down">
        <Logo />
      </div>
      <div className="flex-2">
        <div className="text" data-aos="fade-right">
          <h1>
            Oh, Snap! <br /> it looks like we're at a dead end!
          </h1>
          <p>
            Let's go <Link to={"/"}>back home</Link>
          </p>
        </div>
        <div className="img" data-aos="fade-left">
          <img src={wall} alt="" />
        </div>
      </div>
    </main>
  );
};

export default Error;
