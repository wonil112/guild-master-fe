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

const GameIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 15px;
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
        <div onClick = {handleClick}>
               <GameIcon src={game.image} alt={game.name} />
               <div>
                    <h3>{eventName}</h3>
                    <p> 일시 : {formattedDateRange} </p>
                    <p> 참석 : {eventCurrentPopulation} / {eventTotalPopulation}</p>
               </div>
        </div>
    )
}

export default MyEventItem;