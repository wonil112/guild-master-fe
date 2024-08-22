import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GuildList.css';


const GuildListItem = ({ guild, onClick }) => {

  return (
        <div className='guild-item' onClick={onClick} >
            <div className='guild-name'>{guild.guildName}</div>
            <div className='guild-info'>
                {guild.guildCurrentPopulation} / {guild.guildTotalPopulation} </div>
        </div>
    );
};

export default GuildListItem;