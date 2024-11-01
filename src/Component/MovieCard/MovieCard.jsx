import React from 'react';
import './MovieCard.css'; 
const MovieCard = ({ movie, onClick, isFavorite, toggleFavorite }) => {
    
    const year = movie.premiered ? new Date(movie.premiered).getFullYear() : 'N/A';

    return (
        <div className="movie-card" onClick={onClick}>
            {movie.image && <img src={movie.image.medium} alt={movie.name} />}
            <h3>{movie.name}</h3>
            <p>{year}</p>
            <button onClick={(e) => { e.stopPropagation(); toggleFavorite(); }}>
                {isFavorite ? '💖' : '🤍'}
            </button>
        </div>
    );
};

export default MovieCard;
