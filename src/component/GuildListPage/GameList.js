import React, { useState } from 'react';
import overwatchImage from '../../image/overwatch_black.png'
import valorantImage from '../../image/valorant_black.png'
import lolImage from '../../image/lol_black.png';
import loastark from '../../image/loastark_black.png'
import styled from 'styled-components';

const GameListContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
`;

const GameButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }
`;

const AllGameButton = styled(GameButton)`
  width: 70px;
  height: 70px;
  background-color: #000000;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
`;

const GameImage = styled.img`
  width: 70px;
  height: 70px;
  object-fit: contain;
`;



const gameData = {
    0: { name: 'All' },
    1: { image: overwatchImage, name: 'Overwatch' },
    2: { image: valorantImage, name: 'Valorant' },
    3: { image: lolImage, name: 'League of Legends' },
    4: { image: loastark, name: 'Lost Ark' }
};

const GameList = ({ onSelectGame }) => {
    const [selectedGame, setSelectedGame] = useState(0);
    
    const handleGameClick = (gameId) => {
        setSelectedGame(gameId);
        onSelectGame(gameId === 0 ? null : gameId);
        console.log(`Selected game: ${gameData[gameId].name}`);
        // 여기에 GuildDetailModal을 여는 로직을 추가할 수 있습니다.
    };

    return (
      <GameListContainer>
          {Object.entries(gameData).map(([id, game]) => (
              <GameButton 
                  key={id} 
                  onClick={() => handleGameClick(Number(id))}
                  style={{ opacity: selectedGame === Number(id) ? 1 : 0.5 }}
              >
                  {id === '0' ? (
                      <AllGameButton>ALL</AllGameButton>
                  ) : (
                      <GameImage src={game.image} alt={game.name} />
                  )}
              </GameButton>
          ))}
      </GameListContainer>
    );
}

export default GameList;