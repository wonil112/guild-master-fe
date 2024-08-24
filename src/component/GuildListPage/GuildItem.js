import overwatchImage from '../../image/overwatch_black.png'
import valorantImage from '../../image/valorant_black.png'
import lolImage from '../../image/lol_black.png';
import loastark from '../../image/loastark_black.png'
import styled from 'styled-components';
// list 를 통해 받은 데이터를 가공함.
// onClick 이 되면 GuildDetailModal 이 뜸. 

const gameData = {
    1: { image: overwatchImage, name: 'Overwatch' },
    2: { image: valorantImage, name: 'Valorant' },
    3: { image: lolImage, name: 'League of Legends' },
    4: { image: loastark, name: 'Lost Ark' }
};

const GuildItemWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #4a3b7f;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const GameIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 15px;
`;

const GuildInfo = styled.div`
  flex-grow: 1;
  color: white;
`;

const GuildName = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const GuildPopulation = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
`;

const GuildItem = ({ gameId, guildName, guildCurrentPopulation, guildTotalPopulation, onClick }) => {

    const game = gameData[gameId];

    return (
        <GuildItemWrapper onClick={onClick}>
            <GameIcon src={game.image} alt={game.name} />
            <GuildInfo>
                <GuildName>{guildName}</GuildName>
                <GuildPopulation>{guildCurrentPopulation} / {guildTotalPopulation}</GuildPopulation>
            </GuildInfo>
        </GuildItemWrapper>
    );
};

export default GuildItem;
