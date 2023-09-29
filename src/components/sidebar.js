import { Link } from "react-router-dom";
import { Logo } from "./utils";
import home from "../icons/Home.png";
import projector from "../icons/MovieProjector.png";
import tv from "../icons/TVShow.png";
import logout from "../icons/Logout.png";
import calender from "../icons/Calendar.png";

const Sidebar = () => {
  return (
    <aside className="column sidebar">
      <Logo />
      <div className="links-wrapper column">
        <Link to={"/"} className="center">
          <img src={home} alt="icon" />
          <span>Home</span>
        </Link>
        <Link to={"/"} className="center active">
          <img src={projector} alt="icon" />
          <span>Movies</span>
        </Link>
        <Link to={"/"} className="center">
          <img src={tv} alt="icon" />
          <span>TV Series</span>
        </Link>
        <Link to={"/"} className="center">
          <img src={calender} alt="icon" />
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
          <img src={logout} alt="icon" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
