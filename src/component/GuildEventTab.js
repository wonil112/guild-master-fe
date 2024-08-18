import React from 'react';
import Tab from './Tab';
import GuildEventItem from './GuildEventItem';
import {guildEventData} from '../data/guildEventData'
import './GuildEventTab.css'; 
import './Tab.css'

const GuildEventTab = () => {
    console.log(guildEventData); 
    if (!guildEventData) {
        return <p>No event data available.</p>;
    }
    // EVENT_ACTIVE와 EVENT_COMPLETE로 분류
    const activeEvents = guildEventData.filter(event => event.eventStatus === "EVENT_ACTIVE");
    const completeEvents = guildEventData.filter(event => event.eventStatus === "EVENT_COMPLETE");

    const tabs = [
        {
            label: 'ActiveEvents',
            content: (
                <>
                    {activeEvents.length > 0 ? (
                        activeEvents.map(eventItem => (
                            <GuildEventItem key={eventItem.guildId} guildEvent={eventItem} />
                        ))
                    ) : (
                        <p>No active events</p>
                    )}
                </>
            )
        },
        {
            label: 'Completed Events',
            content: (
                <>
                    {completeEvents.length > 0 ? (
                        completeEvents.map(event => (
                            <GuildEventItem key={event.guildId} guildEvent={event} />
                        ))
                    ) : (
                        <p>No completed events</p>
                    )}
                </>
            )
        }
    ];

    return <div className="guild-event-tab-container"><Tab tabs={tabs} /></div>;
};

export default GuildEventTab;
