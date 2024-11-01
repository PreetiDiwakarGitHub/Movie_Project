import React, { useState, useEffect } from 'react';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);      
  const [error, setError] = useState(null);       

  const fetchMovies = async () => {
    try {
      const response = await fetch('https://api.example.com/movies');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchMovies();    
  }, []);

  return (
    <div>
      <h2>Movies List</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoviesList;
