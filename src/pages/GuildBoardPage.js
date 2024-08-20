import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
// guildHeader 를 추가적으로 만들어야 함. 지금은 임시로 넣은 것임. guildHeader 에는 그 guild에 해당하는 id 를 받아서
// 그 guild 의 game 을 받아야 함. 
import Header from './HomeHeader';
import './GuildBoardPage.css';
import Modal from '../component/Modal';
import GuildEventTab from '../component/GuildEventTab';

const GuildBoardPage = () => {
    // 로그인 한 회원의 memberId 를 나중에 받아서 그 Member 가 가입한 길드에 들어올 수 있어야 함. 
    // Guild 를 클릭하는 순간 그 guild 의 id 를 받아서 그 id 에 해당하는 길드에 들어올 수 있음. 
    const { guildId } = useParams();
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
                    <GuildEventTab guildId={parseInt(guildId, 10)} onEventClick={handleEventClick} />
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
