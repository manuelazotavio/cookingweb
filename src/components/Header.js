import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import logo from "../img/gr.png";
import isAuth from "../helpers/authOkay";


const Header = () => {
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const isLogged = isAuth()

  const updateMenu = () => {
    setIsMenuClicked(!isMenuClicked);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="header">
      <Link to="/landing-page">
        <img to="/home" className="logo" src={logo} alt="Logo" />
      </Link>
      <nav className="navbar">
        <div className="burger-menu" onClick={updateMenu}>
          <div
            className={`burger-bar ${isMenuClicked ? "clicked" : "unclicked"}`}
          ></div>
          <div
            className={`burger-bar ${isMenuClicked ? "clicked" : "unclicked"}`}
          ></div>
          <div
            className={`burger-bar ${isMenuClicked ? "clicked" : "unclicked"}`}
          ></div>
        </div>
        <ul className={`nav-list ${isMenuClicked ? "visible" : "hidden"} ${isLogged ? "logged" : "logged-out"}`}>
          <li className="nav-item">
            <Link to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/create-recipe">Criar Receita</Link>
          </li>
          <li className="nav-item">
            <Link to="/account">Conta</Link>
          </li>

        
        </ul>

        <ul className={`nav-list-3 ${isMenuClicked ? "visible" : "hidden"} ${isLogged ? "logged" : "logged-out"}`}>
          <li className="nav-item">
            <Link onClick={() => scrollToSection("about")}>Sobre</Link>
          </li>
          <li className="nav-item">
            <Link onClick={() => scrollToSection("ratings")}>Avaliações</Link>
          </li>
          <li className="nav-item">
            <Link onClick={() => scrollToSection("contact")}>Contato</Link>
          </li>

        
        </ul>
        
        <ul className={`nav-list-2 ${isMenuClicked ? "visible" : "hidden"} ${isLogged ? "logged" : "logged-out"}`}>
            <li className="nav-item-2">
            <Link to="/login">Login</Link>
          </li>

          <li className="nav-item-2">
            <Link to="/sign-in">Cadastre-se</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
