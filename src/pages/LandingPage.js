import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Global.css';
import Logo from '../logo/fulllogo_white_big.png';
import styled from 'styled-components';


export const StyledHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  margin: 20px;
  padding-right: 10px;  
`;

export const LoginButton = styled.button`
  height: 40px;
  width: 80px;
  border-radius: 10px;
  background-color: #FFFFFF;
  color: #000000;
  cursor: pointer;
  font-size: 20px;
`;

export const StyledButton = styled.button`
  
  justify-content: center;
  align-items: right;
  height: 40px;
  border-radius: 10px;
  background-color: #000000;
  color: #FFFFFF;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;


const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <StyledHeader>
                <LoginButton onClick={() => navigate('/login')}>login</LoginButton>
            </StyledHeader>           
            <Main>
                <h1>
                    <img src={Logo} alt="Logo" className="logo" />
                </h1>
                <StyledButton onClick={() => navigate('/guildlist')}>find your guild</StyledButton>
            </Main>
        </div>
    );
};

export default LandingPage;