import { Link } from "react-router-dom";
import { Logo } from "./utils";
import { FaHome } from "react-icons/fa";
import { ImVideoCamera as Projector } from "react-icons/im";
import { FaTv, FaCalendarDays as Calendar } from "react-icons/fa6";
import { GrLogout as Logout } from "react-icons/gr";

const Sidebar = ({ type }) => {
  return (
    <aside className="column sidebar">
      <Logo />
      <div className="links-wrapper column">
        <Link to={"/"} className="center">
          <FaHome />
          <span>Home</span>
        </Link>
        <Link
          to={"/categories"}
          className={type == "movie" ? "center active" : "center"}
        >
          <Projector />
          <span>Movies</span>
        </Link>
        <Link
          to={"/categories"}
          className={type == "series" ? "center active" : "center"}
        >
          <FaTv />
          <span>TV Series</span>
        </Link>
        <Link to={"/categories"} className="center">
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
