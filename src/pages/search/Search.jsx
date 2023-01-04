import React, { useState } from "react";
import Movie from "./components/Movie";
import Nav from "../browse/components/Nav";

import "./components/Movie.css";
import "../browse/components/Row.css";

export default function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const url = `https://api.themoviedb.org/3/search/movie?api_key=1526c72205e4f8d0f1f7cc3e6eaf8386&query=${query}`;

  const SearchMovies = async (e) => {
    e.preventDefault();
    console.log("submitting");

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Nav />
      <form className="form" onSubmit={SearchMovies}>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="search a movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button">Search</button>
      </form>
      <h2 className="label" htmlFor="query">
        Search Results
      </h2>

      <div className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <Movie movie={movie} key={movie.id} />
          ))}
      </div>
    </>
  );
}
