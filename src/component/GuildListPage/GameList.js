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

const GameImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

const gameData = {
    1: { image: overwatchImage, name: 'Overwatch' },
    2: { image: valorantImage, name: 'Valorant' },
    3: { image: lolImage, name: 'League of Legends' },
    4: { image: loastark, name: 'Lost Ark' }
};

const GameList = () => {
    const [selectedGame, setSelectedGame] = useState(null);

    const handleGameClick = (gameId) => {
        setSelectedGame(gameId);
        console.log(`Selected game: ${gameData[gameId].name}`);
        // 여기에 GuildDetailModal을 여는 로직을 추가할 수 있습니다.
    };

    return (
        <GameListContainer>
            {Object.entries(gameData).map(([id, game]) => (
                <GameButton key={id} onClick={() => handleGameClick(Number(id))}>
                    <GameImage src={game.image} alt={game.name} />
                </GameButton>
            ))}
        </GameListContainer>
    );
}

export default GameList;