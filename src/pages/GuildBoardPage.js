import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
// guildHeader 를 추가적으로 만들어야 함. 지금은 임시로 넣은 것임. guildHeader 에는 그 guild에 해당하는 id 를 받아서
// 그 guild 의 game 을 받아야 함. 
import './GuildBoardPage.css';
import Modal from '../component/Modal';
import GuildEventTab from '../component/GuildEventTab';
import EventCreateModal from '../component/EventCreateModal';
import { games } from '../data/gameData';
import GuildBoardHeader from '../component/GuildBoardHeader';

const GuildBoardPage = () => {
    // 로그인 한 회원의 memberId 를 나중에 받아서 그 Member 가 가입한 길드에 들어올 수 있어야 함. 
    // Guild 를 클릭하는 순간 그 guild 의 id 를 받아서 그 id 에 해당하는 길드에 들어올 수 있음. 
    const { guildId } = useParams();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
 
    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setModalOpen(true);
    };

    const [eventCreateModalOpen, setEventCreateModalOpen] = useState(false);

    const handleCreateEvent = (newEvent) => {
        // 여기에 이벤트 생성 로직을 구현하세요
        setEventCreateModalOpen(false);
        // 예: API 호출을 통해 서버에 새 이벤트 저장
    };
    const handleCreateEventClick = () => {
        // 이벤트 생성 로직 구현
        setEventCreateModalOpen(true);
    };
    
    const handleManageClick = () => {
        navigate('/manage');
    };


    return (
        <div className='main'>
        <div className="guild-board-container">
            <GuildBoardHeader />
            <div className="button-container">
                <button onClick={handleManageClick}>길드원 관리</button>
                <button onClick={handleCreateEventClick}>이벤트 생성</button>
            </div>
            <div className="guild-board-content">
                <div className="calendar-placeholder">
                    {/* 좌측 비어있는 공간 */}
                </div>
                <div className="event-tab-container">
                    <GuildEventTab guildId={parseInt(guildId, 10)} onEventClick={handleEventClick} />
                </div>
            </div>
            <EventCreateModal 
                isOpen={eventCreateModalOpen}
                onClose={() => setEventCreateModalOpen(false)}
                onCreateEvent={handleCreateEvent}
                />
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
