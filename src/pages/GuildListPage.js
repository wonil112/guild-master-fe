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

const GuildListPage = () => {
  const [selectedGameId, setSelectedGameId] = useState(null);
  const handleImageClick = (gameId) => {
    setSelectedGameId(gameId);
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
            <GuildList gameId={selectedGameId}/>
        </div>   
      </div>
         

    );
};
    
export default GuildListPage;