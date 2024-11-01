// src/MovieList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Movie = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const moviesPerPage = 20;
    const [totalMovies, setTotalMovies] = useState(0);
    
    const fetchMovies = async (pageNumber) => {
        setLoading(true);
        const movieName = "Avengers"; 
        try {
            const response = await axios.get(`https://www.omdbapi.com/?s=${movieName}&page=${pageNumber}&apikey=1e54f907`);
            if (response.data.Response === "True") {
                setMovies(response.data.Search);
                setTotalMovies(Number(response.data.totalResults));
            } else {
                setError(response.data.Error);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies(page);
    }, [page]);

    const totalPages = Math.ceil(totalMovies / moviesPerPage);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="movie-grid">
                {movies.map(movie => (
                    <div className="movie-card" key={movie.imdbID}>
                        <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"} alt={movie.Title} />
                        <h3>{movie.Title}</h3>
                        <p>{movie.Year}</p>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>Previous</button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default Movie;
