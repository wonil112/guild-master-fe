import React from 'react';
import './GuildList.css';

const GuildListItem = ({ guild }) => {
  return (
        <div className='guild-item'>
            <div className='guild-name'>{guild.guildname}</div>
            <div className='guild-info'>
                {guild.currentpopulation} / {guild.totalpopulation} </div>
            <div className='button-container'>
                <button>선택</button>
            </div>
        </div>
  );
};

export default GuildListItem;
