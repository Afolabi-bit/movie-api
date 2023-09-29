import React from "react";
import { useGlobalContext } from "../context";

import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Featured from "../components/featured";

const Home = () => {
  const { setLoading, loading } = useGlobalContext();
  return (
    <main>
      <section className="hero-wrapper">
        <Navbar />
        <Hero />
      </section>
      <Featured />
    </main>
  );
};

export default Home;
