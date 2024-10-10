import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">CookingWeb</Link>
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/receitas">Receitas</Link>
          </li>
          <li className="nav-item">
            <Link to="/conta">Conta</Link>
          </li>
          <li className="nav-item">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;