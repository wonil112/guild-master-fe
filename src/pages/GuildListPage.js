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
import { GuildPost } from '../api/GuildPost'; 
import { GuildsGet } from '../api/GuildsGet';

const GuildListPage = () => {
  // 길드 데이터 get api 요청하는 로직. 
  const [guilds,  setGuilds] = useState([]); // 길드 목록을 저장할 state
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
    // 길드 목록을 가져오는 함수
  const fetchGuilds = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await GuildsGet(1, 100); // 페이지 1, 크기 100으로 요청
        setGuilds(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
  };


  // 상위 게임을 눌렀을 때 gameId를 입력 받기 위한 state. 
  const [selectedGameId, setSelectedGameId] = useState(null);
  const handleImageClick = (gameId) => {
    setSelectedGameId(gameId);
  };
  useEffect(() => {
    fetchGuilds();
  }, [selectedGameId]);
  // 모달을 열고 닫기 위한 state. 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // 홈으로 가기 버튼 후 홈 페이지로 이동하기 위한 state
  const navigate = useNavigate();
  const handleHomeClick = () => {
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
  };

  
  // 길드 생성 버튼을 누르면 모달이 뜸. 
  const handleCreateGuild = async (newGuild) => {
      try {
        const result = await GuildPost(
          newGuild.game,
          newGuild.name,
          newGuild.masterNickname,
          newGuild.maxMembers,
          newGuild.description
        );
        if (result.success) {
          alert(result.message); // 성공 메시지 표시
          // 여기에 길드 목록을 새로고침하는 로직을 추가할 수 있습니다.
          closeModal();
        } else {
          alert('길드 생성에 실패했습니다.');
        }
      } catch (error) {
        console.error('Guild creation error:', error);
        alert(error.message || '길드 생성 중 오류가 발생했습니다.');
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
        // 모든 길드 datafmf 데리고 와야 함. 

        <GuildList 
          guilds={guilds} // 가져온 길드 목록을 전달한다. 
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