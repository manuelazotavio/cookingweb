import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import marca from "../img/marca.png";
import '../styles/Footer.css'

const Footer = () => {


  return (
    <div className="footer">
      <Link to="/landing-page">
        <img to="/home" className="marca" src={marca} alt="Logo" />
      </Link>
      <nav className="navbar-footer">
        <ul className="nav-list-footer">
          <li className="nav-item">
            <Link to="/home"><strong>Baixe o App</strong></Link>
          </li>
          <li className="nav-item">
            <Link to="/criar-receita"><strong>Precisa de ajuda?</strong></Link>
          </li>
        </ul>
        
        <ul className="nav-list-footer">
            <li className="nav-item-2">
            <Link to="/login">Login</Link>
          </li>

          <li className="nav-item-2">
            <Link to="/cadastrar">Cadastre-se</Link>
          </li>
        </ul>

        <h6>© 2025 Manuela Otavio</h6>
      </nav>
    </div>
  );
};

export default Footer;
