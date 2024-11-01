import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard/MovieCard';
import './Code.css';

const Code = ({ searchTerm, toggleFavorite, wishlistMovies, category }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [title, setTitle] = useState('Movie Gallery'); 
  const MOVIES_PER_PAGE = 20;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://api.tvmaze.com/shows');
        setMovies(response.data);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    if (category === "Favorites List") {
      setTitle("Favorites List");
    } else if (category === "All Movies") {
      setTitle("All Movies");
    } else {
      setTitle(category); 
    }
  }, [category]); 

  const isFavorite = (movie) => wishlistMovies.some((m) => m.id === movie.id);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  const startIndex = (page - 1) * MOVIES_PER_PAGE;
  const filteredMovies = category === "Favorites List"
    ? movies.filter(isFavorite)
    : category === "All Movies"
      ? movies
      : movies.filter((movie) => movie.genres.includes(category));
  const searchFilteredMovies = filteredMovies.filter(movie =>
    movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentMovies = searchFilteredMovies.slice(startIndex, startIndex + MOVIES_PER_PAGE);

  const handleMovieClick = (movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  return (
    <div className="app">
      <h1>{title}</h1>
      {loading && <p>Loading movies...</p>}
      {error && <p className="error">{error}</p>}
      <div className="movie-grid">
        {currentMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => handleMovieClick(movie)}
            isFavorite={isFavorite(movie)}
            toggleFavorite={() => toggleFavorite(movie)}
          />
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
        <button onClick={handleNextPage} disabled={page * MOVIES_PER_PAGE >= searchFilteredMovies.length}>Next</button>
      </div>
      {selectedMovie && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>&times;</button>
            <h2 className="modal-title">{selectedMovie.name}</h2>
            {selectedMovie.image ? (
              <img src={selectedMovie.image.medium} alt={selectedMovie.name} className="modal-image" />
            ) : (
              <p>No Image Available</p>
            )}
            <div className="modal-details">
              <p><strong>Year:</strong> {selectedMovie.premiered ? new Date(selectedMovie.premiered).getFullYear() : 'N/A'}</p>
              <p><strong>Details:</strong></p>
              <p>{selectedMovie.summary}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Code;
