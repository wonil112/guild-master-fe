import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './HomeHeader';
import './GuildBoardPage.css';
import Modal from '../component/Modal';
import { guildEventData } from '../data/guildEventData';
import GuildEventItem from '../component/GuildEventItem';

const GuildBoardPage = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('ongoing');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    
    const activeEvents = guildEventData.filter(event => event.eventStatus === "EVENT_ACTIVE");
    const completedEvents = guildEventData.filter(event => event.eventStatus === "EVENT_COMPLETE");

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setModalOpen(true);
    };

    return (
        <div className="guild-board-container">
            <Header />
            <div className="guild-board-content">
                <div className="guild-info">
                    <h2>Guild Name</h2>
                    <p>ID: {id}</p>
                </div>
                <div className="main-content">
                    <div className="calendar-placeholder"></div>
                    <div className="event-tab-container">
                        <div className="tab-container">
                            <div 
                                className={`tab ${activeTab === 'ongoing' ? 'active' : ''}`} 
                                onClick={() => setActiveTab('ongoing')}
                            >
                                진행중 이벤트
                            </div>
                            <div 
                                className={`tab ${activeTab === 'completed' ? 'active' : ''}`} 
                                onClick={() => setActiveTab('completed')}
                            >
                                종료된 이벤트
                            </div>
                        </div>
                        <div className="event-list">
                            {activeTab === 'ongoing' 
                                ? activeEvents.map(event => (
                                    <div key={event.guildId} onClick={() => handleEventClick(event)}>
                                        <GuildEventItem guildEvent={event} />
                                    </div>
                                ))
                                : completedEvents.map(event => (
                                    <div key={event.guildId} onClick={() => handleEventClick(event)}>
                                        <GuildEventItem guildEvent={event} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            {modalOpen && selectedEvent && (
                <Modal 
                    event={selectedEvent} 
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    );
};

export default GuildBoardPage;