import React from 'react';
import Tab from './Tab';
import GuildEventItem from './GuildEventItem';
import {guildEventData} from '../data/guildEventData'
import './Tab.css'

const HomeEventTab = ({ onEventClick }) => { 
    console.log(guildEventData); 
    if ( !guildEventData ) {
        return <p>No event data available.</p>;
    }
    const activeEvents = guildEventData.filter(event => event.eventStatus === "EVENT_ACTIVE");
    const completeEvents = guildEventData.filter(event => event.eventStatus === "EVENT_COMPLETE");
    
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

    return <div className="home-event-tab-container'"><Tab tabs={tabs} /></div>;


};

export default HomeEventTab;