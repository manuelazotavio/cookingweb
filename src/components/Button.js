import React from 'react';
import '../styles/Button.css';

const Button = ({ title, onClick }) => {
  return (
    <button className="button-original" onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;