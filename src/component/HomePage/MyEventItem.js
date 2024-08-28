import overwatchImage from '../../image/overwatch_black.png'
import valorantImage from '../../image/valorant_black.png'
import lolImage from '../../image/lol_black.png';
import loastark from '../../image/loastark_black.png'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const gameData = {
    1: { image: overwatchImage, name: 'Overwatch' },
    2: { image: valorantImage, name: 'Valorant' },
    3: { image: lolImage, name: 'League of Legends' },
    4: { image: loastark, name: 'Lost Ark' }
};


const EventItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const GameIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
  object-fit: cover;
`;

const EventInfo = styled.div`
  flex: 1;
`;

const EventName = styled.h3`
  margin: 0 0 5px 0;
  font-size: 18px;
`;

const EventDetail = styled.p`
  margin: 3px 0;
  font-size: 14px;
  color: #666;
`;
const handleClick = (e) => {
};

const MyEventItem = ({gameId, eventName, eventCurrentPopulation, eventTotalPopulation, startDate, dueDate}) => {
    const game = gameData[gameId];

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
    const formattedDateRange = formatDateRange(startDate, dueDate);

    return (
        <EventItemContainer onClick={handleClick}>
            <GameIcon src={game.image} alt={game.name} />
            <EventInfo>
                <EventName>{eventName}</EventName>
                <EventDetail>일시: {formattedDateRange}</EventDetail>
                <EventDetail>참석: {eventCurrentPopulation} / {eventTotalPopulation}</EventDetail>
            </EventInfo>
        </EventItemContainer>
    );
}

export default MyEventItem;