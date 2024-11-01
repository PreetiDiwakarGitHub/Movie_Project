import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Drama.css'; 

const Drama = () => {
  const [dramaMovies, setDramaMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const MOVIES_PER_PAGE = 20;

  useEffect(() => {
    const fetchDramaMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://api.tvmaze.com/shows');
        const filteredMovies = response.data.filter(movie => movie.genres.includes('Drama'));
        setDramaMovies(filteredMovies);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDramaMovies();
  }, []);

  const handleMovieClick = (movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  const toggleFavorite = (movie) => {
    if (favorites.includes(movie.id)) {
      setFavorites(favorites.filter((id) => id !== movie.id)); // Remove from favorites
    } else {
      setFavorites([...favorites, movie.id]); // Add to favorites
    }
  };

  const isFavorite = (movie) => favorites.includes(movie.id);

  const totalPages = Math.ceil(dramaMovies.length / MOVIES_PER_PAGE);
  const currentMovies = dramaMovies.slice((page - 1) * MOVIES_PER_PAGE, page * MOVIES_PER_PAGE);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div className="app">
      <h1>Drama Movie Gallery</h1>
      {loading && <p>Loading movies...</p>}
      {error && <p className="error">{error}</p>}
      <div className="movie-grid">
        {currentMovies.map((movie) => (
          <div className="movie-card" key={movie.id} onClick={() => handleMovieClick(movie)}>
            <img src={movie.image?.medium} alt={movie.name} />
            <h3>{movie.name}</h3>
            <button onClick={(e) => { e.stopPropagation(); toggleFavorite(movie); }}>
              {isFavorite(movie) ? '💖' : '🤍'} {/* Heart icon for favorite */}
            </button>
          </div>
        ))}
      </div>

      
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
        <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
      </div>

      
      {selectedMovie && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>&times;</button>
            <h2>{selectedMovie.name}</h2>
            <img src={selectedMovie.image?.medium} alt={selectedMovie.name} />
            <p>{selectedMovie.summary}</p>
          </div>
        </div>
      )}

     
      {favorites.length > 0 && (
        <div className="favorites">
          <h2>Favorites</h2>
          <div className="movie-grid">
            {dramaMovies
              .filter(movie => favorites.includes(movie.id))
              .map((movie) => (
                <div className="movie-card" key={movie.id}>
                  <img src={movie.image?.medium} alt={movie.name} />
                  <h3>{movie.name}</h3>
                  <button onClick={(e) => { e.stopPropagation(); toggleFavorite(movie); }}>
                    💖 
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Drama;
