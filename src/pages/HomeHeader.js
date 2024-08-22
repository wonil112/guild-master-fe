import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeHeader.css'; // 스타일 파일 확인
import Logo from '../logo/fulllogo_white.png'; // 경로 확인
import { logout } from '../api/logout';

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    setIsLoggedIn(token !== null);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    handleNavigate('/login');
    logout();
  };

  return (
    <header className="header">
      <img 
        src={Logo} 
        alt="Logo" 
        className="logo" 
        onClick={() => handleNavigate('/home')} // 클릭 시 이동
      />
      <div className="nav-container">
        <button className="nav-button" onClick={() => handleNavigate('/mypage')}>My Page</button>
        <button className="nav-button" onClick={() => handleNavigate('/guildlist')}>Search</button>
        {isLoggedIn ? (
          <button className="logout-button" onClick={handleLogout}>logout</button>
        ) : (
          <button className="login-button" onClick={() => handleNavigate('/login')}>login</button>
        )}
      </div>
    </header>
  );
};

export default Header;

