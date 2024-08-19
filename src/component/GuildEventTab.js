import React from 'react';
import Tab from './Tab';
import GuildEventItem from './GuildEventItem';
import {guildEventData} from '../data/guildEventData'
import './GuildEventTab.css'; 
import './Tab.css'

const GuildEventTab = ({ guildId, onEventClick }) => {


    console.log(guildEventData); 
    if (!guildEventData || ! guildId) {
        return <p>No event data available.</p>;
    }
    const filteredEvents = guildEventData.filter(event => event.guildId === guildId);

    // EVENT_ACTIVE와 EVENT_COMPLETE로 분류
    const activeEvents = filteredEvents.filter(event => event.eventStatus === "EVENT_ACTIVE");
    const completeEvents = filteredEvents.filter(event => event.eventStatus === "EVENT_COMPLETE");

    const tabs = [
        {
            label: '진행중 이벤트',
            content: (
                <>
                    {activeEvents.length > 0 ? (
                        activeEvents.map(eventItem => (
                            <div key={eventItem.eventId} onClick={() => onEventClick(eventItem)}>
                                <GuildEventItem guildEvent={eventItem} />
                            </div>
                        ))
                    ) : (
                        <p>No active events</p>
                    )}
                </>
            )
        },
        {
            label: '종료된 이벤트',
            content: (
                <>
                    {completeEvents.length > 0 ? (
                        completeEvents.map(eventItem => (
                            <div key={eventItem.eventId} onClick={() => onEventClick(eventItem)}>
                                <GuildEventItem guildEvent={eventItem} />
                            </div>
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
