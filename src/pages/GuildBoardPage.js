import '../Global.css';
import React, { useState, useEffect } from 'react';
import { useParams, Link  } from 'react-router-dom';
import GlobalHeader from './GlobalHeader';
import axios from 'axios';
import GuildBoardCalendar from '../image/guildBoardCalender.png'
import GuildEventList from '../component/GuildBoardPage/GuildEventList'
import styled from 'styled-components';

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const CalendarImage = styled.img`
  width: 700px;
  height: 850px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
  gap: 10px;
  margin-top: 90px;
  margin-right: 30px;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  width: 1300px;
  height: 700px;
  gap: 50px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  // ... other styles ...
`;

const GuildBoardPage = () => {
    const [guildEventList, setGuildEventList] = useState([]);
    const { guildId } = useParams(); // 라우터에서 guildId를 가져옵니다
    const [selectedEventId, setSelectedEventId] = useState(null);

    useEffect(() => {
        fetchGuildEvents();
    }, [guildId]);


    const fetchGuildEvents = async () => {
        try {
            const token = localStorage.getItem('token'); // 토큰을 로컬 스토리지에서 가져옵니다. 실제 토큰 저장 위치에 따라 수정하세요.
            const response = await axios.get(`/events/guilds/${guildId}?page=1&size=100`, {
                headers: {
                    'Authorization': `${token}` // 토큰을 헤더에 추가합니다
                }
            });
            setGuildEventList(response.data.data);
        } catch (error) {
            console.error('Failed to fetch guild events:', error);
        }
      };

      const handleEventClick = (eventId) => {
        setSelectedEventId(eventId);
        // 여기에 모달을 열거나 다른 작업을 수행하는 로직을 추가할 수 있습니다.
      };
  




    return (
        <div>
            <GlobalHeader />
            <MainContainer>
            <ButtonContainer>
                    <StyledButton>이벤트 생성</StyledButton>
                    <StyledLink to="/manage">
                        <StyledButton>길드원 관리</StyledButton>
                    </StyledLink>
                </ButtonContainer>
                <ContentWrapper>
                    <CalendarImage src={GuildBoardCalendar} alt="Guild Board Calendar" />
                    <GuildEventList
                        list={guildEventList} 
                        onEventClick={handleEventClick}
                    />
                </ContentWrapper>
            </MainContainer>
    </div>
    );
};

export default GuildBoardPage;