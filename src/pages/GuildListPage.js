import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GuildList from '../component/GuildList';
import GuildListItem from '../component/GuildListItem';
import lolImage from '../img/lol_black.png';
import overwatchImage from '../img/overwatch_black.png'
import valorantImage from '../img/valorant_black.png'
import loastarkImage from '../img/loastark_black.png'
import './GuildListPage.css'
import Header from './HomeHeader'
import Modal from '../component/Modal';
import GuildCreateModal from '../component/GuildCreateModal';

const GuildListPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  
  // 상위 게임을 눌렀을 때 gameId를 입력 받기 위한 state. 
  const [selectedGameId, setSelectedGameId] = useState(null);
  const handleImageClick = (gameId) => {
    setSelectedGameId(gameId);
  };
  // 모달을 열고 닫기 위한 state. 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // 홈으로 가기 버튼 후 홈 페이지로 이동하기 위한 state
  const navigate = useNavigate();
  const handleHomeClick = () => {
    if (isLoggedIn) {
      // 로그인 되어 있으면 홈으로 가기. 
      navigate('/home');
    } else {
      alert('로그인이 필요한 서비스입니다.');
      // 로그인 페이지로 리다이렉트하는 로직을 추가할 수 있습니다.
      navigate('/login');
    }
    
  };
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
  
  //guild list item 을 클릭하면 guild의 Id 를 전달하고, guild 조회 신청 Modal 이 열리게 함. 
  const handleGuildClick = (guild) => {
    setSelectedGuild(guild);
    setIsGuildInfoModalOpen(true);
  };
  // guild 조회 신청 모달이 닫힘. 
  const closeGuildInfoModal = () => {
    setIsGuildInfoModalOpen(false);
    setSelectedGuild(null);
  };
  // 모달 후 길드 가입을 위한 로직. 
  const [nickname, setNickname] = useState('');
  const handleJoinGuild = () => {
    //로그인이 되어 있는 상태면, 
    if (isLoggedIn) {
      // 여기에 길드 가입 로직을 구현합니다.
      closeGuildInfoModal();
    } else {
      alert('로그인이 필요한 서비스입니다.');
      // 로그인 페이지로 리다이렉트하는 로직을 추가할 수 있습니다.
      navigate('/login');
    }
  };

  
  // 길드 생성 버튼을 누르면 모달이 뜸. 
  const handleCreateGuild = (newGuild) => {
    // 여기에 길드 생성 로직을 구현합니다.
    console.log('New guild created:', newGuild);
    
    if (isLoggedIn) {
      // 여기에 길드 가입 로직을 구현합니다.
      closeModal();
    } else {
      alert('로그인이 필요한 서비스입니다.');
      // 로그인 페이지로 리다이렉트하는 로직을 추가할 수 있습니다.
      navigate('/login');
    }
  };


  return (
    <div>
      <Header/>
      <div className='main'>
        <div className="img-container">
          <img src = {overwatchImage} onClick={() => handleImageClick(1)}/>
          <img src = {valorantImage} onClick={() => handleImageClick(2)}/>
          <img src={lolImage} onClick={() => handleImageClick(3)}/>
          <img src = {loastarkImage} onClick={() => handleImageClick(4)} />
        </div>
        <div className="modal-button-container">
          <button className="guild-list-button" onClick={openModal}>길드 생성</button>

        </div>
        <GuildList 
          gameId={selectedGameId} 
          onGuildClick={handleGuildClick} 
          />
        <div className="home-button-container">
           <button className="home-button" onClick={handleHomeClick}>홈으로 가기</button>
        </div>
        <GuildCreateModal 
          isOpen={isModalOpen}
          onClose={closeModal}
          onCreateGuild={handleCreateGuild}
          games={games}
        />
    <Modal
        isOpen={isGuildInfoModalOpen}
        onClose={closeGuildInfoModal}
        title={selectedGuild ? selectedGuild.guildName : ''}
        buttonText="가입 신청"
        onButtonClick={handleJoinGuild}
    >
      {selectedGuild && (
        <div className="guild-info-modal">
          <span>인원수</span>
          <p>{selectedGuild.guildCurrentPopulation} / {selectedGuild.guildTotalPopulation}</p>
          <span>길드 설명</span>
          <p>{selectedGuild.guildContent}</p>
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
      </div>
    </div>
  );
};
    
export default GuildListPage;