import React from 'react';
import MovieCard from '../MovieCard/MovieCard';

const Wishlist = ({ wishlistMovies = [], toggleFavorite }) => {
    return (
        <div className="app">
            <h1>Wishlist</h1>
            {wishlistMovies.length === 0 ? (
                <p>No movies in your wishlist.</p>
            ) : (
                <div className="movie-grid">
                    {wishlistMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            isFavorite={true}
                            toggleFavorite={() => toggleFavorite(movie)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
