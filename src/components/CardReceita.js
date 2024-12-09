import React from "react";
import "../styles/CardReceita.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser, faClock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useUserLoggedStore from "../stores/useUserLoggedStore.js";

const CardReceita = ({ receita }) => {
  const navigate = useNavigate();
  const userId = useUserLoggedStore((state) => state.id);

  return (
    <div
      className="card"
      onClick={() => navigate("/receita", { state: { receita, userId } })}
    >
      <img
        src={receita.imagem}
        alt={receita.name}
        className="foto-img"
      />
      <h3 className="titulo-receita">{receita.name}</h3>
      <div className="info-container">
        <div className="info-item">
          <FontAwesomeIcon icon={faClock} size="19" color="#FF421D" />
          <span className="tempo">{receita.tempo}</span>
        </div>
        <div className="info-item">
          <FontAwesomeIcon icon={faStar} color="#F7D342" size="23" />
          <span className="avaliacao">{receita.avaliacao}</span>
        </div>
        <div className="info-item">
          <FontAwesomeIcon icon={faUser} color="#9EA69E" size="19" />
          <span className="porcoes">{receita.porcoes}</span>
        </div>
      </div>
    </div>
  );
};

export default CardReceita;
