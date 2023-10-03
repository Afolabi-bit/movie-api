import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";

import Home from "./pages/home";
import Movie from "./pages/movie";
import Error from "./pages/error";
import Categories from "./pages/categories";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/movies/:id" element={<Movie />}></Route>
        <Route path="/categories" element={<Categories />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
