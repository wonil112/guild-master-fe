import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GlobalHeader.css';
import Logo from '../logo/fulllogo_white.png';

const GlobalHeader = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    console.log('handleNavigate called with path:', path);
    navigate(path);
  };

  return (
    <header className="header">
      <img 
        src={Logo} 
        alt="Logo" 
        className="logo" 
        onClick={() => {
          console.log('Logo clicked');
          handleNavigate('/home');
        }}
        style={{ cursor: 'pointer' }}
      />
      <nav className="nav-container">
        <button className="nav-button" onClick={() => {
          console.log('My Page button clicked');
          handleNavigate('/mypage');
        }}>My Page</button>
        <button className="nav-button" onClick={() => {
          console.log('Search button clicked');
          handleNavigate('/guildlist');
        }}>Search</button>
        <button className="login-button" onClick={() => {
          console.log('Login button clicked');
          handleNavigate('/login');
        }}>Login</button>
      </nav>
    </header>
  );
};

export default GlobalHeader;