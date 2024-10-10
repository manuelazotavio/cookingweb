import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../img/logo.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="header">
    
       
        <Link className='tituloHeader'>CookingWeb</Link>
        <img className='logo' src={logo}></img>
      
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/criar-receita">Criar Receita</Link>
          </li>
          <li className="nav-item">
            <Link to="/conta">Conta</Link>
          </li>
          
        </ul>
      </nav>
    </div>
  );
};

export default Header;