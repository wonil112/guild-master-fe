import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './LoginPage.css'; 
import Button from '../component/Button';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartEnter = () => {
    navigate('/guildlist');  // 길드 목록 페이지로 이동
  };
  const handleLogin = () => {
    navigate('/login');
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Button onClick= {handleLogin} message = "login">
      </Button>
      <h1>Welcome to Our Guild Service</h1>
      <Button onClick={handleStartEnter} style={{ padding: '10px 20px', fontSize: '16px' }} message="시작하기">
      </Button>
    </div>
  );
};
export default LandingPage;