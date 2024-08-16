import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameList from '../component/GameList';
import GuildList from '../component/GuildList';
import GuildListItem from '../component/\bGuildListItem';
import lolImage from '../img/lol_black.png';
import overwatchImage from '../img/overwatch_black.png'
import valorantImage from '../img/valorant_black.png'
import loastark from '../img/loastark_black.png'
import './GuildListPage.css'

const GuildListPage = () => {
    return (
        <div>
          <div className="img-container">
            <img className='img' src={lolImage} />
            <img src = {overwatchImage}/>
            <img src = {valorantImage}/>
            <img src = {loastark} />
          </div>
          <GuildList/>
        </div>    

    );
};
    
export default GuildListPage;