import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Logo } from "./utils";
import { FaHome } from "react-icons/fa";
import { ImVideoCamera as Projector } from "react-icons/im";
import { FaTv, FaCalendarDays as Calendar } from "react-icons/fa6";
import { GrLogout as Logout } from "react-icons/gr";
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
          <FaHome />
          <span>Home</span>
        </Link>
        <Link
          to={"/categories"}
          className={type === "movie" ? "center active" : "center"}
          data-aos="zoom-in-left"
          data-aos-duration="21000"
        >
          <Projector />
          <span>Movies</span>
        </Link>
        <Link
          to={"/categories"}
          className={type === "series" ? "center active" : "center"}
          data-aos="zoom-in-left"
          data-aos-duration="21000"
        >
          <FaTv />
          <span>TV Series</span>
        </Link>
        <Link
          to={"/categories"}
          className="center"
          data-aos="zoom-in-left"
          data-aos-duration="21000"
        >
          <Calendar />
          <span>Upcoming</span>
        </Link>
      </div>
      <div className="text">
        <div className="wrapper">
          <h3>Play movie quizes and earn free tickets</h3>
          <p>50k people are playing now</p>
          <button>Start playing</button>
        </div>
        <button className="logout">
          <Logout />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
