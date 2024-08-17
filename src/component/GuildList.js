import React from 'react';
import './GuildList.css';
import GuildListItem from './\bGuildListItem';
import {guildData} from '../data/guildData'

const GuildList = () => {
  const filteredGuilds = guildData.filter(guild => guild.gameId === gameId);

  return (
    <div className='guild-list-container'>
    <div className='guild-list'>
            {filteredGuilds.map((guilditem) => 
            <GuildListItem
                key={guilditem.guildId}
                guild={guilditem}
            />)}
    </div>
    </div>
  );
};

export default GuildList;
