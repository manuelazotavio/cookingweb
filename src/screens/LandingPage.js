import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import Button from "../components/Button";

const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <div className="LpContainer">
      <div className="inicial">
      <div className="imagemContainer"></div>
      <div className="titulosContainer">
        <h1 className="titulo-lp">Pense, escreva e bote a mão na massa.</h1>
        <h5 className="subtitulo-lp">Tudo em um só lugar.</h5>
        <Button onClick={() => navigate("/login")} title="Comece já"></Button>
      </div>
    </div>
      <div className="sobreContainer">
        <h1 className="titulo-sobre">O que somos?</h1>
        <h5 className="subtitulo-sobre">Se você deseja armazenar suas ideias culinárias com segurança, o Guarda-Receita é o local perfeito. Cadastre-se já e desfrute do sabor da organização e praticidade.</h5>

        <div className="botoes">

        <Button title="Aplicativo"></Button>
        <Button onClick={() => navigate("/cadastrar")} title="Versão web"></Button>
        </div>
        
      </div>
    </div>
  );
};

export default LandingPage;
