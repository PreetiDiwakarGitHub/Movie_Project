import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from "./Component/Footer/Footer";
import Navber from "./Component/Navber/Navber";
import Photo from "./Component/Photo/Photo";
import Code from "./Component/Code/Code";
import Contact from "./Component/Contact/Contact";
import Wishlist from './Component/Wishlist/Wishlist';
import Login from "./Component/Login/Login";
import Last from "./Component/Last/Last";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All Movies");
  const [searchTerm, setSearchTerm] = useState(""); 
  const [wishlistMovies, setWishlistMovies] = useState([]); 

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (term) => {
    setSearchTerm(term); 
  };

  const toggleFavorite = (movie) => {
    if (wishlistMovies.some((m) => m.id === movie.id)) {
      setWishlistMovies(wishlistMovies.filter((m) => m.id !== movie.id));
    } else {
      setWishlistMovies([...wishlistMovies, movie]);
    }
  };

  return (
    <Router>
      <Footer />
      <Navber onCategorySelect={handleCategorySelect} onSearch={handleSearch} />
      <Photo />
      
      <Routes>
        {/* Pass category and searchTerm to the Code component */}
        <Route path="/" element={<Code category={selectedCategory} searchTerm={searchTerm} toggleFavorite={toggleFavorite} wishlistMovies={wishlistMovies} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wishlist" element={<Wishlist wishlistMovies={wishlistMovies} toggleFavorite={toggleFavorite} />} />
      </Routes>
      <Last/>
    </Router>
  );
}

export default App;
