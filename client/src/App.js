import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";

import Home from "./pages/home";
import Movie from "./pages/movie";
import Error from "./pages/error";
import Categories from "./pages/categories";
import AuthPage from "./server/auth";
import Profile from "./pages/profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/movies/:id" element={<Movie />}></Route>
        <Route path="/categories" element={<Categories />}></Route>
        <Route path="/signin" element={<AuthPage />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
