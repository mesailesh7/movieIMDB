import { useEffect, useState } from "react";
import "./App.css";

import Search from "./components/Search";

//Api
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [searchTerm, setsearchTerm] = useState("");
  const [errorMessage, seterrorMessage] = useState(null);

  const fetchMovies = async () => {
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error(`Error fetch movies: ${error}`);
      seterrorMessage("Error fetching Movies: Please try again");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <main>
        <div className="pattern" />
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="Hero Banner" />
            <h1>
              Find <span className="text-gradient">Movies</span> You'll Enjoy
              with the Hassle
            </h1>
            <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
          </header>
          <section className="all-movies">
            <h2>All Movies</h2>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
