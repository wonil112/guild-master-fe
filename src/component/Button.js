import React from "react";
import "./Button.css";

const Button = ({ onClick, message }) => {
  return (
    <button className="btn" onClick={onClick}>
      {message}
    </button>
  );
};

export default Button;