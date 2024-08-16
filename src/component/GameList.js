import React from 'react';
import './GameList.css';

const GameList = ({ games }) => {
  return (
    <div className="game-list">
      {games.map((game) => (
        <div className="game-item">
          <img src={game.logo} className="game-logo" />
          <p>{game.name}</p>
        </div>
      ))}
    </div>
  );
};

export default GameList;
