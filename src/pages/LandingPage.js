import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Global.css';
import Logo from '../logo/fulllogo_white_big.png';
import styled from 'styled-components';


const HeaderStyle = styled.header`
  display: flex;
  justify-content: flex-end;
  margin: 20px;
  padding-right: 10px;  
`;

const LoginButtonStyle = styled.button`
  height: 40px;
  width: 80px;
  border-radius: 10px;
  background-color: #FFFFFF;
  color: #000000;
  cursor: pointer;
  font-size: 20px;
`;

const ButtonStyle = styled.button`
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

const LandingPageMainStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
  overflow: hidden;
`;

const LandingPageLogoStyle = styled.img`
  width: 350px;
  cursor: pointer;
  margin-left: 10px;
`;


const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <HeaderStyle>
                <LoginButtonStyle onClick={() => navigate('/login')}>login</LoginButtonStyle>
            </HeaderStyle>           
            <LandingPageMainStyle>
                <LandingPageLogoStyle src={Logo}
                  alt="Logo"
                  className="logo" />
                <ButtonStyle onClick={() => navigate('/guildlist')}>find your guild</ButtonStyle>
            </LandingPageMainStyle>
        </div>
    );
};

export default LandingPage;