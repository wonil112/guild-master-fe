import React, { useState } from 'react';
import Modal from './Modal';

const GuildCreateModal = ({ isOpen, onClose, onCreateGuild, games }) => {
  const [guildName, setGuildName] = useState('');
  const [selectedGame, setSelectedGame] = useState('');
  const [maxMembers, setMaxMembers] = useState('');
  const [masterNickname, setMasterNickname] = useState('');
  const [guildDescription, setGuildDescription] = useState('');

  const handleCreateGuild = () => {
    const newGuild = {
      name: guildName,
      game: selectedGame,
      maxMembers: parseInt(maxMembers),
      masterNickname,
      description: guildDescription
    };
    onCreateGuild(newGuild);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="길드 생성"
      buttonText="생성"
      onButtonClick={handleCreateGuild}
    >
      <div className="modal-content">
        <label htmlFor="guildName">길드명</label>
        <input
          type="text"
          id="guildName"
          placeholder="길드이름을 입력하세요"
          value={guildName}
          onChange={(e) => setGuildName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="gameSelect">게임 선택</label>
        <select
          id="gameSelect"
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
        >
          <option value="">게임을 선택하세요</option>
          {games.map(game => (
            <option key={game.id} value={game.id}>{game.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="maxMembers">최대 인원 수</label>
        <input
          type="number"
          id="maxMembers"
          placeholder="최대 인원 수를 입력하세요"
          value={maxMembers}
          onChange={(e) => setMaxMembers(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="masterNickname">마스터 닉네임</label>
        <input
          type="text"
          id="masterNickname"
          placeholder="길드마스터의 닉네임을 입력하세요"
          value={masterNickname}
          onChange={(e) => setMasterNickname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="guildDescription">길드 설명</label>
        <span>
          <textarea
            id="guildDescription"
            placeholder="길드에 대한 설명을 입력하세요"
            value={guildDescription}
            onChange={(e) => setGuildDescription(e.target.value)}
          ></textarea>
        </span>
      </div>
    </Modal>
  );
};

export default GuildCreateModal;