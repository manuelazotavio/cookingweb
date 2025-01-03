import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import picture from "../img/chef2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser, faClock } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import Footer from "../components/Footer";

const LandingPage = () => {
  const navigate = useNavigate();
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
        <h5 className="subtitulo-sobre">
          Se você deseja armazenar suas ideias culinárias com segurança, o
          Guarda-Receita é o local perfeito. Cadastre-se já e desfrute do sabor
          da organização e praticidade.
        </h5>

        <div className="botoes">
          <Button title="Aplicativo"></Button>
          <Button
            onClick={() => navigate("/cadastrar")}
            title="Versão web"
          ></Button>
        </div>
      </div>
      <div className="avaliacoesContainer">
        <h1 className="titulo-sobre">Avaliações</h1>
        <div className="avaliacaoCard">
          <img className="profile-image-lp" src={picture} alt="Avatar" />
          <div>

          <h5 className="subtitulo-sobre">
          O site é super intuitivo para cadastrar receitas! Tudo é direto ao ponto: só preenchi os campos, coloquei minha foto e pronto, minha receita estava online. É perfeito para quem não quer perder tempo com burocracia.
          </h5>
          </div>
        </div>
        <div className="avaliacaoCard">
          <img className="profile-image-lp" src={picture} alt="Avatar" />
          <h5 className="subtitulo-sobre">
          O site é bonito e organizado. Todas as receitas ficam super bem apresentadas, e a interface é bem pensada. Ficaria perfeito com uma pequena atualização para o modo noturno.
          </h5>
        </div>
        <div className="avaliacaoCard">
          <img className="profile-image-lp" src={picture} alt="Avatar" />
          <h5 className="subtitulo-sobre">
          Adorei que o site me permite personalizar minha receita do jeitinho que eu quero. Não tem limitações chatas, e eu consigo colocar meu toque especial em cada prato que cadastro. Dá até vontade de criar um livro de receitas só meu!
          </h5>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default LandingPage;
