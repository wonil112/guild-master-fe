import React from 'react';
import './GuildList.css';
import GuildListItem from './\bGuildListItem';

const GuildList = () => {
  const guilds = [
    {id: 1, guildname : 'Guild name A', currentpopulation:'12', totalpopulation:'20'},
    {id: 2, guildname : 'Guild name B', currentpopulation:'30', totalpopulation:'50'},
    {id: 3, guildname : 'Guild name C', currentpopulation:'145', totalpopulation:'200'}
  ];

  return (
    <div className='guild-list'>

            {guilds.map((guilditem) => 
            <GuildListItem
                guild={guilditem}
            />)}
    </div>
  );
};

export default GuildList;
