import React, { useEffect } from "react";
import Sidebar from "../components/sidebar";
import SeriesData from "../components/seriesData";

const Series = () => {
  return (
    <main className="movie flex">
      <Sidebar type={"series"} />
      <SeriesData />
    </main>
  );
};

export default Series;
