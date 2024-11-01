import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navber.css';

function Navber({ onCategorySelect, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleCategoryClick = (category) => {
    onCategorySelect(category);
    setIsNavOpen(false);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">MyApp</Link>
        </div>
        <div className="hamburger" onClick={toggleNav}>
          <div className={`line ${isNavOpen ? 'active' : ''}`}></div>
          <div className={`line ${isNavOpen ? 'active' : ''}`}></div>
          <div className={`line ${isNavOpen ? 'active' : ''}`}></div>
        </div>
        <ul className={`navbar-links ${isNavOpen ? 'open' : ''}`}>
          {['All Movies', 'Comedy', 'Drama', 'Crime', 'Horror', 'Romance', 'Family'].map((category) => (
            <li key={category} onClick={() => handleCategoryClick(category)}>
              <Link to="/">{category}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Navber;
