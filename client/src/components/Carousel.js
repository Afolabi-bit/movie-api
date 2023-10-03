import Card, { SeriesCard, PersonCard } from "./card";

const Carousel = ({ movieList, type }) => {
  return (
    <div className="carousel ">
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
