import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GuildBoardHeader.css'; // 스타일 파일 확인
import { games } from '../data/gameData';
import Logo from '../logo/logo_white.png'; // 경로 확인
import { logout } from '../api/logout';
import { guildData } from '../data/guildData';

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem('token');
  
  console.log(guildData);
  console.log(games);
  
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
  
  const selectedGuild = guildData[0]; // 첫 번째 길드 선택
  const selectedGame = games.find((game) => game.id === selectedGuild.gameId);
  const guildName = selectedGuild.guildName;

  console.log('Selected Game:', selectedGame);
  console.log('Guild Name:', guildName);
  console.log('Guild Data:', guildData);
  console.log('Games:', games);

  return (
    <header className="header">
      <img 
        src={Logo} 
        className="guild-board-logo" 
        onClick={() => handleNavigate('/home')}
        alt="Logo" 
      />
      <div className="guild-info-container">
        {selectedGame && selectedGame.whiteImage && (
          <img
            src={selectedGame.whiteImage}
            className="guild-game-image"
            alt={selectedGame.name}
          />
        )}
        <div className="guild-name">{guildName}</div>
      </div>
      <div className="nav-buttons">
        <button className="guild-board-header-nav-button" onClick={() => handleNavigate('/mypage')}>My Page</button>
        <button className="guild-board-header-nav-button" onClick={() => handleNavigate('/guildlist')}>Search</button>
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

