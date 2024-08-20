import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './HomeHeader';
import './GuildBoardPage.css';
import Modal from '../component/Modal';
import GuildEventTab from '../component/GuildEventTab';

const GuildBoardPage = () => {
    const { id } = useParams();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setModalOpen(true);
    };

    return (
        <div className='main'>
        <div className="guild-board-container">
            <Header />
            <div className="guild-board-content">
                <div className="calendar-placeholder">
                    {/* 좌측 비어있는 공간 */}
                </div>
                <div className="event-tab-container">
                    <GuildEventTab guildId={parseInt(id, 10)} onEventClick={handleEventClick} />
                </div>
            </div>
            {modalOpen && selectedEvent && (
                <Modal
                    event={selectedEvent}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
        </div>
    );
};

export default GuildBoardPage;
