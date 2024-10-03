import React from 'react';
import { FaPlus } from 'react-icons/fa'; 
import '../styles/AdicionarBtn.css';

const AdicionarBtn = ({ title, onPress }) => {
  return (
    <button className="custom-button" onClick={onPress}>
      <FaPlus className="icon" />
      <span className="text-button">{title}</span>
    </button>
  );
};

export default AdicionarBtn;