import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Crime.css';

const Crime = () => {
  const [crimeShows, setCrimeShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const SHOWS_PER_PAGE = 20;

  useEffect(() => {
    const fetchCrimeShows = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://api.tvmaze.com/shows');
        const filteredShows = response.data.filter(show => show.genres.includes('Crime'));
        setCrimeShows(filteredShows);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCrimeShows();
  }, []);

  const handleShowClick = (show) => setSelectedShow(show);
  const closeModal = () => setSelectedShow(null);

  const toggleFavorite = (show) => {
    if (favorites.includes(show.id)) {
      setFavorites(favorites.filter((id) => id !== show.id)); // Remove from favorites
    } else {
      setFavorites([...favorites, show.id]); // Add to favorites
    }
  };

  const isFavorite = (show) => favorites.includes(show.id);

  const totalPages = Math.ceil(crimeShows.length / SHOWS_PER_PAGE);
  const currentShows = crimeShows.slice((page - 1) * SHOWS_PER_PAGE, page * SHOWS_PER_PAGE);

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
      <h1>Crime Show Gallery</h1>
      {loading && <p>Loading shows...</p>}
      {error && <p className="error">{error}</p>}
      <div className="show-grid">
        {currentShows.map((show) => (
          <div className="show-card" key={show.id} onClick={() => handleShowClick(show)}>
            <img src={show.image?.medium} alt={show.name} />
            <h3>{show.name}</h3>
            <button onClick={(e) => { e.stopPropagation(); toggleFavorite(show); }}>
              {isFavorite(show) ? '💖' : '🤍'} {/* Heart icon for favorite */}
            </button>
          </div>
        ))}
      </div>

     
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
        <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
      </div>

      
      {selectedShow && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>&times;</button>
            <h2>{selectedShow.name}</h2>
            <img src={selectedShow.image?.medium} alt={selectedShow.name} />
            <p>{selectedShow.summary}</p>
          </div>
        </div>
      )}

      
      {favorites.length > 0 && (
        <div className="favorites">
          <h2>Favorites</h2>
          <div className="show-grid">
            {crimeShows
              .filter(show => favorites.includes(show.id))
              .map((show) => (
                <div className="show-card" key={show.id}>
                  <img src={show.image?.medium} alt={show.name} />
                  <h3>{show.name}</h3>
                  <button onClick={(e) => { e.stopPropagation(); toggleFavorite(show); }}>
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

export default Crime;
