import '../Global.css';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import GlobalHeader from './GlobalHeader';
import axios from 'axios';
import GuildBoardCalendar from '../image/guildBoardCalender.png'
import GuildEventList from '../component/GuildBoardPage/GuildEventList'
import GuildEventCreateModal from '../component/GuildBoardPage/GuildEventCreateModal'
import GuildEventDetailModal from '../component/GuildBoardPage/GuildEventDetailModal'
import styled from 'styled-components';
import overwatchImage from '../image/overwatch_black.png'
import valorantImage from '../image/valorant_black.png'
import lolImage from '../image/lol_black.png';
import loastark from '../image/loastark_black.png'

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  flex: 1;
  max-height: 95vh;
  overflow: hidden;
  overflow-x: hidden;
  position: relative;
  max-width: 100vw;
`;

const CalendarImage = styled.img`
  width: 100%;
  max-width: 700px;
  height: auto;
  max-height: 80vh;
  object-fit: contain;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
  gap: 10px;
  margin-top: 70px;
  margin-right: 30px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1500px;
  margin: 30px auto 0;
  gap: 20px;
  max-height: 80vh;  /* 버튼 컨테이너와 이미지 포함 높이 */
  overflow: hidden; /* 가로 및 세로 스크롤 방지 */

  @media (min-width: 1200px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 80px;
  }
`;

const EventListWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  margin-top: 14px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 20px;
  overflow-y: auto;
  max-height: 73vh;

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

const GameIcon = styled.img`
  width: 80px;  /* 이미지 크기를 적절히 조정 */
  height: 80px;
  margin-bottom: 8px;
`;

const GuildInfoContainer = styled.div`
  position: absolute;
  top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`;

const GuildName = styled.h1`
  font-size: 24px;
  color: white;
  text-align: center;
`;

const gameData = {
  1: { image: overwatchImage, name: 'Overwatch' },
  2: { image: valorantImage, name: 'Valorant' },
  3: { image: lolImage, name: 'League of Legends' },
  4: { image: loastark, name: 'Lost Ark' }
};    

const GuildBoardPage = () => {
    const [guildEventList, setGuildEventList] = useState([]);
    const { guildId } = useParams(); // 라우터에서 guildId를 가져옵니다
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [guildName, setGuildName] = useState('');
    const [gameId, setGameId] = useState('');
    const navigate = useNavigate();


    const game = gameData[gameId];


    useEffect(() => {
        fetchGuildEvents();
        fetchGuildInfo();
    }, [guildId]);

    const fetchGuildInfo = async () => {
      try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`/guilds/${guildId}`, {
              headers: {
                  'Authorization': `${token}`
              }
          });
          setGuildName(response.data.data.guildName);
          setGameId(response.data.data.gameId);
      } catch (error) {
          console.error('Failed to fetch guild info:', error);
      }
  };

    const fetchGuildEvents = async () => {
        try {
            const token = localStorage.getItem('token'); // 토큰을 로컬 스토리지에서 가져옵니다. 실제 토큰 저장 위치에 따라 수정하세요.
            const response = await axios.get(`/events/guilds/${guildId}?page=1&size=100`, {
                headers: {
                    'Authorization': `${token}` // 토큰을 헤더에 추가합니다
                }
            });
            setGuildEventList(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error('Failed to fetch guild events:', error);
        }
      };

      const handleOpenModal = () => {
        setIsModalOpen(true);
      };

      const handleCloseModal = () => {
        setIsModalOpen(false);
    };

      const handleEventCreateSuccess = () => {
        fetchGuildEvents();
      };

      const handleManageClick = () => {
        console.log("길드원 관리 버튼 클릭됨");
        console.log("현재 guildId:", guildId);
        navigate(`/manage/${guildId}`);
       };

    return (
        <div>
            <GlobalHeader />
            <MainContainer>
              <GuildInfoContainer>
                {game && (
                  <>
                    <GameIcon src={game.image} alt={game.name} />
                    <GuildName>{guildName}</GuildName>
                  </>
                )}
              </GuildInfoContainer>
                <ButtonContainer>
                    <StyledButton onClick={handleOpenModal}>
                        이벤트 생성
                    </StyledButton>                    
                    <StyledButton onClick={handleManageClick} >길드원 관리</StyledButton>
                </ButtonContainer>
                <ContentWrapper>
                    <CalendarImage src={GuildBoardCalendar} alt="Guild Board Calendar" />
                    <EventListWrapper>
                      <GuildEventList
                        list={guildEventList} 
                      />
                    </EventListWrapper>
                </ContentWrapper>
            </MainContainer>
              <GuildEventCreateModal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal}                
                onEventCreateSuccess={handleEventCreateSuccess}
              />
        </div>
    )
};
export default GuildBoardPage;