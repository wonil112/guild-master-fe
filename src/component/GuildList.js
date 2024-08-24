import React from 'react';
import './GuildList.css';
import GuildListItem from './GuildListItem';
import {guildData} from '../data/guildData'

const GuildList = ({ guilds, gameId, onGuildClick }) => {

  const filteredGuilds = gameId
  ? guilds.data.filter(guild => guild.data.gameId === gameId)
  : guilds;

  console.log(filteredGuilds);
  console.log(guilds)
  return (
    <div className='guild-list-container'>
      <div className='guild-list'>
            {filteredGuilds.map(guild => (
            <GuildListItem
                key={guild.guildId}
                guild={guild}
                onClick={() => onGuildClick(guild)}
            />))}
      </div>
    </div>
  );
};

export default GuildList;
