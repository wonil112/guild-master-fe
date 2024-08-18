import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GuildEventItem.css';

const GuildEventItem = ({guildEvent}) => {

    
    return (
        <div className="guild-event-item">
            <h1 className="event-dates">
                {guildEvent.eventName}
            </h1>
            <p>
                일시 {guildEvent.startDate} - {guildEvent.dueDate}
            </p>
            <p className="event-population">
                참석 {guildEvent.eventCurrentPopulation} / {guildEvent.eventTotalPopulation}
            </p>
        </div>
    )
}
export default GuildEventItem;