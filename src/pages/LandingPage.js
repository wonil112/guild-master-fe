import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';  // 스타일 모듈 임포트     // 공통 스타일 임포트
import Button from '../component/Button';  // 경로 확인
import Logo from '../logo/fulllogo_white_big.png';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartEnter = () => {
    navigate('/guildlist');  // 길드 목록 페이지로 이동
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="main">
      <button className="loginButton" onClick={handleLogin}>login</button>
      <img src={Logo} className="logo" />
      <Button className="startButton" onClick={handleStartEnter} message="find your guild ➔ " />
    </div>
  );
};

export default LandingPage;
