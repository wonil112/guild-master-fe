import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GuildList from '../component/GuildList';
import GuildListItem from '../component/\bGuildListItem';
import lolImage from '../img/lol_black.png';
import overwatchImage from '../img/overwatch_black.png'
import valorantImage from '../img/valorant_black.png'
import loastark from '../img/loastark_black.png'
import './GuildListPage.css'
import Header from './HomeHeader'
import Modal from '../component/Modal';

const GuildListPage = () => {
  // 상위 게임을 눌렀을 때 gameId를 입력 받기 위한 state. 
  const [selectedGameId, setSelectedGameId] = useState(null);
  const handleImageClick = (gameId) => {
    setSelectedGameId(gameId);
  };
  // 모달을 열고 닫기 위한 state. 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleButtonClick = () => {
    closeModal();
  };
  // 홈으로 가기 버튼 후 홈 페이지로 이동하기 위한 state
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/home');
  };
  // 길드 생성 입력 창을 받기 위한 state
  const [guildName, setGuildName] = useState('');
  const [maxMembers, setMaxMembers] = useState('');
  const [masterNickname, setMasterNickname] = useState('');
  const [guildDescription, setGuildDescription] = useState('');
  const [selectedGame, setSelectedGame] = useState('');
  // Games 드롭박스를 받기 위한 함수. 
  const games = [
    { id: 1, name: '오버워치' },
    { id: 2, name: '발로란트' },
    { id: 3, name: '리그오브레전드' },
    { id: 4, name: '로스트아크' }
  ];
  // Guild info 모달을 열기위함. 각 길드를 입력하면, 그 길드에 해당하는 info가 뜸. 
  const [isGuildInfoModalOpen, setIsGuildInfoModalOpen] = useState(false);
  // guildid 의 길드를 데리고 와서, 
  const [selectedGuild, setSelectedGuild] = useState(null);

  const handleGuildClick = (guild) => {
    setSelectedGuild(guild);
    setIsGuildInfoModalOpen(true);
  };
  const closeGuildInfoModal = () => {
    setIsGuildInfoModalOpen(false);
    setSelectedGuild(null);
    setNickname('');
  };

  // 닉네임을 받는 State 
  const [nickname, setNickname] = useState('');
  // 모달 후 길드 가입을 위한 로직. 
  const handleJoinGuild = () => {
    // 여기에 길드 가입 로직을 구현합니다.
    console.log(`Joining guild ${selectedGuild.guildName} with nickname: ${nickname}`);
    closeGuildInfoModal();
  };



  return (
    <div> 
      <Header/>
      <div className='main'>
        <div className="img-container">
          <img src = {overwatchImage} onClick={() => handleImageClick(1)}/>
          <img src = {valorantImage} onClick={() => handleImageClick(2)}/>
          <img src={lolImage} onClick={() => handleImageClick(3)}/>
          <img src = {loastark} onClick={() => handleImageClick(4)} />
        </div>
        <div className="modal-button-container">
          <button className="guild-list-button" onClick={openModal}>길드 생성</button>
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            title="길드 생성"
            buttonText="생성"
            onButtonClick={handleButtonClick}
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
        </div> 
        <GuildList 
          gameId={selectedGameId} 
          onGuildClick={handleGuildClick} />
          <Modal
            isOpen={isGuildInfoModalOpen}
            onClose={closeGuildInfoModal}
            title={selectedGuild ? selectedGuild.guildName : ''}
            buttonText="가입 신청"
            onButtonClick={handleJoinGuild}
          >
          {selectedGuild && (
            <div className="guild-info-modal">
              <span> 인원수 </span>
               <p> {selectedGuild.guildCurrentPopulation} / {selectedGuild.guildTotalPopulation} </p>
              <span> 길드 설명 </span>
              <p>{selectedGuild.guildContent}</p>
              <p></p>
              <div>
                <label htmlFor="nickname">닉네임</label>
                <input
                  type="text"
                  id="nickname"
                  placeholder="닉네임을 입력하세요"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>
            </div>
          )}
        </Modal>
        <div className="home-button-container">
          <button className="home-button" onClick={handleHomeClick}>흠으로 가기</button>
        </div> 
      </div>
    </div>
  );
};
    
export default GuildListPage;