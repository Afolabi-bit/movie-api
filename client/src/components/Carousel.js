import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Card, { SeriesCard, PersonCard } from "./card";

const Carousel = ({ movieList, type }) => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div className="carousel " data-aos="fade-left">
      <div className="wrapper flex">
        {movieList.map((movie) => {
          if (type === "movie") {
            return <Card key={movie.id} {...movie} />;
          }
          if (type === "series") {
            return <SeriesCard key={movie.id} {...movie} />;
          }
          return <PersonCard key={movie.id} {...movie} />;
        })}
      </div>
    </div>
  );
};

export default Carousel;
