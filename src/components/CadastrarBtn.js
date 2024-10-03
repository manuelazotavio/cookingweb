import React from 'react';
import '../styles/CadastrarBtn.css';

const CadastrarBtn = ({ title, onPress }) => {
  return (
    <button className="custom-button" onClick={onPress}>
      {title}
    </button>
  );
};

export default CadastrarBtn;
