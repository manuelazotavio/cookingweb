import React from 'react';
import '../styles/Button.css';

const Button = ({ title, onPress }) => {
  return (
    <button className="custom-button" onClick={onPress}>
      {title}
    </button>
  );
};

export default Button;