import React, { useState, useEffect } from "react";
import "./MovieWidget.css";

const MovieWidget = () => {
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("Inception");

  const fetchMovieData = async (movieName = searchTerm) => {
    if (!movieName.trim()) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=2671d7db&t=${encodeURIComponent(movieName)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.Response === "True") {
        setMovieData(data);
      } else {
        setMovieData(null);
        setError(data.Error || "Movie not found");
      }
    } catch (err) {
      setError("Unable to fetch movie data");
      console.error("Movie API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchMovieData(searchTerm);
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, []);



  if (loading) {
    return (
      <div className="movie-widget">
        <div className="widget-header">
          <h3>Movies</h3>
        </div>
        <div className="loading-state">Loading movie data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-widget">
        <div className="widget-header">
          <h3>Movies</h3>
        </div>
        <div className="error-state">{error}</div>
        <button onClick={() => fetchMovieData()} className="retry-btn">Retry</button>
      </div>
    );
  }

  return (
    <div className="movie-widget">
      <div className="widget-header">
        <h3>Movie</h3>
      </div>
      
      <div className="movie-content">
        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search for a movie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">Search</button>
          </form>
        </div>
        
        {!movieData ? (
          <div className="empty-state">
            <p>Search for a movie to see details.</p>
          </div>
        ) : (
          <div className="movie-details">
            <div className="movie-header">
              <div className="movie-poster">
                {movieData.Poster && movieData.Poster !== "N/A" ? (
                  <img src={movieData.Poster} alt={movieData.Title} />
                ) : (
                  <div className="no-poster">No Poster</div>
                )}
              </div>
              <div className="movie-info">
                <h4 className="movie-title">{movieData.Title}</h4>
                <p className="movie-year">{movieData.Year}</p>
                <p className="movie-rating">{movieData.Rated} • {movieData.Runtime}</p>
                <p className="movie-genre">{movieData.Genre}</p>
                {movieData.imdbRating && (
                  <div className="movie-imdb">
                    ⭐ {movieData.imdbRating}/10
                  </div>
                )}
              </div>
            </div>
            
            <div className="movie-plot">
              <p>{movieData.Plot}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieWidget; 