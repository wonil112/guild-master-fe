import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GuildEventItem.css';

const GuildEventItem = ({guildEvent}) => {

    return (
        <div className="event-item">
            <h2 className="event-dates">
                {guildEvent.eventName}
            </h2>
            <span>
                일시 {new Date(guildEvent.startDate).toLocaleDateString()} - {new Date(guildEvent.dueDate).toLocaleDateString()}
            </span>
            <span className="event-population">
                참석 {guildEvent.eventCurrentPopulation} / {guildEvent.eventTotalPopulation}
            </span>
        </div>
    )
}
export default GuildEventItem;



