import React, { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const apiKey = "8531c996";

  const searchMovies = async () => {
    if (!query.trim()) {
      setError("Please enter a movie name!");
      setMovies([]);
      return;
    }

    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setError("");
      } else {
        setMovies([]);
        setError(data.Error); // Example: Invalid API key!
      }
    } catch (err) {
      setError("Something went wrong!");
      setMovies([]);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🎬 Movie Search App</h1>

      <input
        type="text"
        placeholder="Enter movie name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
          marginRight: "10px",
          borderRadius: "5px",
        }}
      />

      <button
        onClick={searchMovies}
        style={{ padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}
      >
        Search
      </button>

      {/* Error Message */}
      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}

      {/* Movie Results */}
      <div style={{ marginTop: "20px" }}>
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            style={{
              marginBottom: "20px",
              padding: "10px",
              border: "1px solid #ccc",
              width: "250px",
            }}
          >
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <img src={movie.Poster} alt="poster" width="150" />
          </div>
        ))}
      </div>
    </div>
  );
}
