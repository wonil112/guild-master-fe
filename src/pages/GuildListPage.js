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
    return (
      <div> 
        <Header/>
        <div className='main'>
            <div className="img-container">
              <img className='img' src={lolImage} />
              <img src = {overwatchImage}/>
              <img src = {valorantImage}/>
              <img src = {loastark} />
            </div>
          <GuildList/>
        </div>   
      </div>
         

    );
};
    
export default GuildListPage;