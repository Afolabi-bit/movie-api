import React from "react";

const movieCategory = () => {
  return (
    <article className="movieList" data-aos="fade-left">
      {movieList.map((movie) => {
        return <Card key={movie.id} {...movie} animate={true} />;
      })}
    </article>
  );
};

export default movieCategory;
