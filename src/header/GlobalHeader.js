import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GlobalHeader.css'; // 스타일 파일 확인
import Logo from '../logo/fulllogo_white.png'; // 경로 확인


const Header = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    // Logout();
  };
  const handleHome = () => {

  }
  const handleMyPage = () => {
  }

  return (
    <header className="header">
      <img 
        src={Logo} 
        alt="Logo" 
        className="logo" 
        onClick={handleHome} // 클릭 시 이동
      />
      <div className="nav-container">
        <button className="nav-button" onClick={handleMyPage}>My Page</button>
        <button className="nav-button" onClick={() => handleNavigate('/guildlist')}>Search</button>
        {/* {isLoggedIn ? (
          <button className="logout-button" onClick={handleLogout}>logout</button>
        ) : ( */}
          <button className="login-button" onClick={() => handleNavigate('/login')}>login</button>
        {/* )} */}
      </div>
    </header>
  );
};

export default Header;