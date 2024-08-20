import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Header from './HomeHeader';
import Modal from '../component/Modal';
import './HomePage.css'
import HomeEventTab from '../component/HomeEventTab';
import EventCreateModal from '../component/EventCreateModal';

const HomePage = () => {
    // 나중에 토큰으로 지금 로그인 한 memberId 를 받아서 거기에 해당하는 길드, 이벤트를 받아야 함. 
    const { memberId } = useParams();
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
        console.log('New event created:', newEvent);
        setEventCreateModalOpen(false);
        // 예: API 호출을 통해 서버에 새 이벤트 저장
    };
    const handleCreateEventClick = () => {
        // 이벤트 생성 로직 구현
        setEventCreateModalOpen(true);
        console.log('Create Event clicked');
    };

    // 길드원 관리 버튼을 만들면 페이지가 넘어감. 
    const handleManageClick = () => {
        navigate('/manage');
    };



    return (
        <div className='main'>
        <div className="home-container">
            <Header />
            <div className="button-container">
                <button onClick={handleManageClick}>길드원 관리</button>
                <button onClick={handleCreateEventClick}>이벤트 생성</button>
            </div>
            <div className="home-content">
                <div className="guild-tab-container">
                    {/* 좌측 비어있는 공간 */}
                </div>
                <div className="event-tab-container">
                    <HomeEventTab onEventClick={handleEventClick} />
                </div>
            </div>
            <EventCreateModal 
                            isOpen={eventCreateModalOpen}
                            onClose={() => setEventCreateModalOpen(false)}
                            onCreateEvent={handleCreateEvent}
            
            />
        </div>
        </div>
    )
};
 
export default HomePage;