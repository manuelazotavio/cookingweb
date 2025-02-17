import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import picture from "../img/chef2.png";
import Button from "../components/Button";
import mobile from "../img/mobile.png";
import isAuth from '../helpers/authOkay.js'

const LandingPage = () => {
  const navigate = useNavigate();

 const isLogged = isAuth();
  if (isLogged) {
    console.log("logged")
    navigate("/home");
  }

  return (
    <div className="LpContainer">
      <div className="inicial">
        <div className="imageContainer"></div>
        <div className="titlesContainer">
          <h1 className="title-lp">Pense, escreva e bote a mão na massa.</h1>
          <h5 className="subtitle-lp">Tudo em um só lugar.</h5>
          <Button onClick={() => navigate("/login")} title="Comece já"></Button>
        </div>
      </div>
      <div id="about" className="aboutContainer">
        <h1 className="title-about">O que somos?</h1>
        <h5 className="subtitle-about">
          Se você deseja armazenar suas ideias culinárias com segurança, o
          Guarda-Receita é o local perfeito. Cadastre-se já e desfrute do sabor
          da organização e praticidade.
        </h5>
        <h1 className="title-about">Na palma da sua mão</h1>
        <h5 style={{ margin: 6 }} className="subtitle-about">
          Versão mobile em breve!
        </h5>
        <img className="phone" src={mobile}></img>
        <div className="buttons">
          <Button onClick={() => navigate("/home")} title="Versão web"></Button>
        </div>
      </div>
      <div id="ratings" className="ratingsContainer">
        <h1 className="title-about">Avaliações</h1>
        <div className="ratingCard">
          <img className="profile-image-lp" src={picture} alt="Avatar" />
          <div>
            <h5 className="subtitle-about">
              O site é super intuitivo para cadastrar receitas! Tudo é direto ao
              ponto: só preenchi os campos, coloquei minha foto e pronto, minha
              receita estava online.
            </h5>
          </div>
        </div>
        <div className="ratingCard">
          <img className="profile-image-lp" src={picture} alt="Avatar" />
          <h5 className="subtitle-about">
            O site é bonito e organizado. Todas as receitas ficam super bem
            apresentadas, e a interface é bem pensada.
          </h5>
        </div>
        <div className="ratingCard">
          <img className="profile-image-lp" src={picture} alt="Avatar" />
          <h5 className="subtitle-about">
            Adorei que o site me permite personalizar minha receita do jeitinho
            que eu quero. Não tem limitações chatas, e eu consigo colocar meu
            toque especial em cada prato que cadastro. Dá até vontade de criar
            um livro de receitas só meu!
          </h5>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
