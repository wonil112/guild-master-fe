import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../logo/fulllogo_white.png';

const Header = styled.header`
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index:1000;
`;

const LogoImg = styled.img`
  width: 350px;
  cursor: pointer;
  margin-left: 10px;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 30px;
  gap: 10px;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  width: 100px;
  height: 38.5px;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginButton = styled.button`
  background-color: white;
  color: black;
  border: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  height: 38.5px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const LogoutButton = styled(LoginButton)`
  width: 105px;
`;

const GlobalHeader = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    console.log(`Navigating to ${path}`);
    navigate(path);
  };

  return (
    <Header>
      <LogoImg 
        src={Logo} 
        alt="Logo" 
        onClick={() => handleClick('/home')}
      />
      <NavContainer>
        <NavButton onClick={() => handleClick('/mypage')}>My Page</NavButton>
        <NavButton onClick={() => handleClick('/guildlist')}>Search</NavButton>
        {/* {isLoggedIn ? (
          <LogoutButton onClick={handleLogout}>logout</LogoutButton>
        ) : ( */}
          <LoginButton onClick={() => handleClick('/login')}>login</LoginButton>
        {/* )} */}
      </NavContainer>
    </Header>
  );
};

export default GlobalHeader;