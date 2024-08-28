import React, {useState, useEffect} from 'react';
// 닫기 버튼 수행
// 가입하기 버튼 수행.
// guildData에서 원하는 정보를 보여줌. 
import styled from 'styled-components'
import Modal from '../Modal'
import axios from 'axios';
import GuildEventMemberList from './GuildEventMemberList';
import EventRegistrationModal from './EventRegistrationModal'

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  align-items: center;
  margin-left: 350px;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #6a5acd;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const InfoSection = styled.div`
  margin-bottom: 20px;
`;

const InfoItem = styled.div`
  background-color: #6a5acd;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const ParticipantSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ApplyButton = styled(Button)`
  background-color: #191970;
  padding: 10px 20px;
  font-size: 16px;
  margin-top: 20px;
`;


// Event Id 를 하나 받았을 때... guildeventlist 에서 get 으로 data 하나. 받아서 깔아줌. 
const GuildDetailModal = ({ eventId, isOpen, onClose, guildEventDetails, gameId  }) => {
    // // 하나의 특정 이벤트에 대한 멤버 를 axios 로 요청 받아서. GuildEventMemberList 에 뿌려줄 것임. 
    const [guildEventMemberList, setGuildEventMemberList] = useState([]);
    // game 디테일을 데리고 옴. 
    const [gameDetails, setGameDetails] = useState(null);
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
    // 길드 이벤트 참여 멤버를 알 수 있음. 
    // // event/{event-id}/members를 내려주어야 함. 
    useEffect(() => {
      fetchGuildEventMembers();
    }, []);
    const fetchGuildEventMembers = async () => {
      try {
        const token = localStorage.getItem('token'); // 토큰을 로컬 스토리지에서 가져옵니다.
        
        const response = await axios.get(`/events/${eventId}/members?page=1&size=100`, {
          headers: {
            'Authorization': `Bearer ${token}` // 토큰을 Authorization 헤더에 추가합니다.
          }
        });
        
        setGuildEventMemberList(response.data.data);
      } catch (error) {
        console.error("Error fetching guild event members:", error);
      }
    };
    console.log(gameDetails);

    // 날짜...guildEventDetails 에 있을텐데.. 그거를 받아서.... 시간을 잘 보이게 가공. 
    function formatDateRange(startDate, dueDate) {
      const start = new Date(startDate);
      const due = new Date(dueDate);
  
      const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
  
          return `${year}.${month}.${day} ${hours}:${minutes}`;
      };
  
      return `${formatDate(start)} - ${formatDate(due)}`;
    }
    // fetchGameDetails();
    // 여기에 모달을 열거나 다른 작업을 수행할 수 있습니다.

    // Event 참여 멤버 조회. /events/{event-id}/members
    // 게임 정보를 데리고 옴..
    const fetchGameDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/games/${gameId}`, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            setGameDetails(response.data.data);
        } catch (error) {
            console.error("Error fetching game details:", error);
        }
    };
    const handleApplyClick = () => {
      fetchGameDetails();
      setIsRegistrationModalOpen(true);
    };
  
    const handleCloseRegistrationModal = () => {
      setIsRegistrationModalOpen(false);
    };

    return (
      <Modal isOpen={isOpen} onClose={onClose} title={guildEventDetails.eventName}> 
      <ModalContent>
        <Header>
          <ButtonGroup>
            <Button>수정</Button>
            <Button>삭제</Button>
          </ButtonGroup>
          <div>{guildEventDetails.eventCurrentPopulation} / {guildEventDetails.eventTotalPopulation}</div>
        </Header>

        <InfoSection>
          <InfoItem>일시: {formatDateRange(guildEventDetails.startDate, guildEventDetails.dueDate)}</InfoItem>
          <InfoItem>이벤트 설명: {guildEventDetails.eventContent}</InfoItem>
        </InfoSection>

        <ParticipantSection>
          <h3>참여인원 현황</h3>
          <Button>인원 수정</Button>
        </ParticipantSection>
        
        <GuildEventMemberList list = {guildEventMemberList}/>

        <ApplyButton onClick={handleApplyClick}>참가 신청</ApplyButton>
        </ModalContent>
        <EventRegistrationModal 
          isOpen={isRegistrationModalOpen}
          onClose={handleCloseRegistrationModal}
          gameDetails={gameDetails}
          eventId={eventId}
        />
      </Modal>
    );
  };

  export default GuildDetailModal;