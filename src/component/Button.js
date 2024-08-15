import React from "react";
import "./Button.css";

const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
};

function Button() {
  return <button className="btn">히히히</button>;
}

export default Button;