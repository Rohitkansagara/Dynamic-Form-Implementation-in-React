import React from 'react';
import '../../styles/Button.css';

function Button({ label, onClick, type = 'button' }) {
  return (
    <button className="custom-button" onClick={onClick} type={type}>
      {label}
    </button>
  );
}

export default Button;
