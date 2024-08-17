import React from 'react';
import './GuildList.css';
import GuildListItem from './\bGuildListItem';

const GuildList = () => {
  const guilds = [
    {id: 1, guildname : 'Guild name A', currentpopulation:'12', totalpopulation:'20'},
    {id: 2, guildname : 'Guild name B', currentpopulation:'30', totalpopulation:'50'},
    {id: 3, guildname : 'Guild name C', currentpopulation:'145', totalpopulation:'200'},
    {id: 4, guildname : 'Guild name D', currentpopulation:'200', totalpopulation:'300'},
    {id: 5, guildname : 'Guild name E', currentpopulation:'70', totalpopulation:'250'},
    {id: 6, guildname : 'Guild name F', currentpopulation:'123', totalpopulation:'300'},
    {id: 7, guildname : 'Guild name G', currentpopulation:'345', totalpopulation:'430'},
    {id: 8, guildname : 'Guild name H', currentpopulation:'10', totalpopulation:'90'}
    
  ];

  return (
    <div className='guild-list-container'>
    <div className='guild-list'>
      
            {guilds.map((guilditem) => 
            <GuildListItem
                guild={guilditem}
            />)}
    </div>
    </div>
  );
};

export default GuildList;
