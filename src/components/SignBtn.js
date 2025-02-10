import React from 'react';
import '../styles/CadastrarBtn.css';

const SignBtn = ({ title, onClick }) => {
  return (
    <button className="custom-button" onClick={onClick}>
      {title}
    </button>
  );
};

export default SignBtn;