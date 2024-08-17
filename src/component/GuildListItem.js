import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GuildList.css';


const GuildListItem = ({ guild }) => {
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 네비게이션 기능 추가
  
    const handleSelect = () => {
      navigate(`/guildboard/${guild.guildId}`); // 버튼 클릭 시 해당 guild ID에 맞는 페이지로 이동
    };
  return (
        <div className='guild-item'>
            <div className='guild-name'>{guild.guildName}</div>
            <div className='guild-info'>
                {guild.guildCurrentPopulation} / {guild.guildTotalPopulation} </div>
            <div className='button-container'>
                <button>선택</button>
            </div>
        </div>
    );
};

export default GuildListItem;