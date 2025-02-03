import React from 'react';
import { FaPlus } from 'react-icons/fa'; 
import '../styles/AdicionarBtn.css';

const AdicionarBtn = ({ title, onClick }) => {
  return (
    <button type='button' className="custom-button" onClick={onClick}>
      <FaPlus className="icon" />
      <span className="text-button">{title}</span>
    </button>
  );
};

export default AdicionarBtn;