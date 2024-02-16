import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Logo } from "./utils";
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import AOS from "aos";
import "aos/dist/aos.css";

const Sidebar = ({ type }) => {
  useEffect(() => {
    AOS.init({ duration: 1000, offset: 180 });
  }, []);

  return (
    <aside className="column sidebar" data-aos="fade-right">
      <Logo />
      <div className="links-wrapper column">
        <Link
          to={"/"}
          className="center"
          data-aos="zoom-in-left"
          data-aos-duration="21000"
        >
          <IoHomeOutline />
          <span>Home</span>
        </Link>
        <Link
          to={"/categories"}
          className={type === "movie" ? "center active" : "center"}
          data-aos="zoom-in-left"
          data-aos-duration="21000"
        >
          <BiCategoryAlt />
          <span>Categories</span>
        </Link>
        <Link
          to={"/categories"}
          className="center"
          data-aos="zoom-in-left"
          data-aos-duration="21000"
        >
          <FaRegHeart />
          <span>Favourites</span>
        </Link>
      </div>
      <div className="text">
        <div className="wrapper">
          <h3>Play movie quizes and earn free tickets</h3>
          <p>50k people are playing now</p>
          <button>Start playing</button>
        </div>
      </div>
      <Link to={"/profile"} className="logout">
        <IoLogOutOutline />
        <span>Log out</span>
      </Link>
    </aside>
  );
};

export default Sidebar;
