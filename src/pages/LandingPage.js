import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../component/Button';  // 경로 확인

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartEnter = () => {
    navigate('/guildlist');  // 길드 목록 페이지로 이동
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Button onClick={handleLogin} message="Login" />
      <h1>Welcome to Our Guild Service</h1>
      <Button onClick={handleStartEnter} message="시작하기" />
    </div>
  );
};

export default LandingPage;
