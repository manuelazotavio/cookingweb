import React from 'react';
import '../styles/CardReceita.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUser, faClock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const CardReceita = ({ receita }) => {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate('/receita', { state: { receita } })}>
      <img src="https://fakeimg.pl/600x400" alt={receita.name} className="foto-img" />
      <h2 className="titulo">{receita.name}</h2>
      <div className="info-container">
        <div className="info-item">
          <FontAwesomeIcon icon={faClock} size="19" color="#FF421D" />
          <span>{receita.tempo}</span>
        </div>
        <div className="info-item">
          <FontAwesomeIcon icon={faStar} color="#F7D342" size="23" />
          <span>{receita.avaliacao}</span>
        </div>
        <div className="info-item">
          <FontAwesomeIcon icon={faUser} color="#9EA69E" size="19" />
          <span>{receita.porcoes}</span>
        </div>
      </div>
    </div>
  );
};

export default CardReceita;
