import overwatchImage from '../../image/overwatch_black.png'
import valorantImage from '../../image/valorant_black.png'
import lolImage from '../../image/lol_black.png';
import loastark from '../../image/loastark_black.png'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// myGuildList 에서 map 으로 내려준 데이터를 원하는 형식에 따라 정리.
// gameId, guildName, guildCurrentPopulation, guildTotalPopulation. memberGuildRole>> player, master,mamger
// memberGuildstatuses>> MEMBER_GUILD_STATUS_WAIT
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
  flex-shrink: 0;
`;

const GuildInfo = styled.div`
  flex-grow: 1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const GuildName = styled.h3`
  margin: 0;
  font-size: 18px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const GuildPopulation = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  width: 120px;
  text-align: center;
  flex-shrink: 0;
`;
const RoleDisplay = styled.span`
  font-size: 12px;
  font-weight: bold;
  margin-right: 10px;
`;

const StatusDisplay = styled.span`
  font-size: 12px;
  color: ${props => props.isActive ? 'green' : 'orange'};
`;

const MyGuildItem = ({ guildId, gameId, guildName, guildCurrentPopulation, guildTotalPopulation, memberGuildRoles, memberGuildStatuses, onClick}) => {
    const navigate = useNavigate();
    const game = gameData[gameId];
    
    // 권한을 알려줌. 
    const getHighestRole = (roles) => {
        if (roles.includes("MEMBER_GUILD_ROLE_MASTER")) return "MASTER";
        if (roles.includes("MEMBER_GUILD_ROLE_MANAGER")) return "MANAGER";
        if (roles.includes("MEMBER_GUILD_ROLE_PLAYER")) return "PLAYER";
        return "";
    };
    // 가입 대기 중 상태 알려줌. 
    const isActive = memberGuildStatuses.includes("MEMBER_GUILD_STATUS_ACTIVE");
    const statusText = isActive ? "" : "가입대기중";

    const highestRole = getHighestRole(memberGuildRoles);

    const handleClick = (e) => {
        if (isActive) {
            navigate(`/guildboard/${guildId}`);
        }
    };

    
    return (
            <GuildItemWrapper onClick={handleClick} isWaiting={!isActive}>
                <GameIcon src={game.image} alt={game.name} />
                <GuildInfo>
                    <GuildName>{guildName}</GuildName>
                    <GuildPopulation>{guildCurrentPopulation} / {guildTotalPopulation}</GuildPopulation>
                    <RoleDisplay>{highestRole}</RoleDisplay>
                    <StatusDisplay>{statusText}</StatusDisplay>
                </GuildInfo>
            </GuildItemWrapper>
    )
}

export default MyGuildItem;