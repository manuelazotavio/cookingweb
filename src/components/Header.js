import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import marca from "../img/marca.png";
import isAuth from "../helpers/authOkay";


const Header = () => {
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const isLogged = isAuth()

  const updateMenu = () => {
    setIsMenuClicked(!isMenuClicked);
  };

  return (
    <div className="header">
      <Link to="/landing-page">
        <img to="/home" className="marca" src={marca} alt="Logo" />
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
        <ul className={`nav-list ${isMenuClicked ? "visible" : "hidden"} ${isLogged ? "logado" : "deslogado"}`}>
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

        <ul className={`nav-list-3 ${isMenuClicked ? "visible" : "hidden"} ${isLogged ? "logado" : "deslogado"}`}>
          <li className="nav-item">
            <Link to="/home">Sobre</Link>
          </li>
          <li className="nav-item">
            <Link to="/criar-receita">Avaliações</Link>
          </li>
          <li className="nav-item">
            <Link to="/conta">Contato</Link>
          </li>

        
        </ul>
        
        <ul className={`nav-list-2 ${isMenuClicked ? "visible" : "hidden"} ${isLogged ? "logado" : "deslogado"}`}>
            <li className="nav-item-2">
            <Link to="/login">Login</Link>
          </li>

          <li className="nav-item-2">
            <Link to="/cadastrar">Cadastre-se</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
