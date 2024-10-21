import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import logo from "../img/logo.png";

const Header = () => {
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const updateMenu = () => {
    setIsMenuClicked(!isMenuClicked);
  };

  return (
    <div className="header">
      <Link to="/" className="tituloHeader">CookingWeb</Link>
      <img className="logo" src={logo} alt="Logo" />

      <nav>
        <div className="burger-menu" onClick={updateMenu}>
          <div className={`burger-bar ${isMenuClicked ? "clicked" : "unclicked"}`}></div>
          <div className={`burger-bar ${isMenuClicked ? "clicked" : "unclicked"}`}></div>
          <div className={`burger-bar ${isMenuClicked ? "clicked" : "unclicked"}`}></div>
        </div>
        <ul className={`nav-list ${isMenuClicked ? "visible" : "hidden"}`}>
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
