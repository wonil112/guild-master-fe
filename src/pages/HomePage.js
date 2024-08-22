import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Header from './HomeHeader';
import Modal from '../component/Modal';
import './HomePage.css'
import HomeEventTab from '../component/HomeEventTab';

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

    return (
        <div className='main'>
        <div className="home-container">
            <Header />
            <div className="home-content">
                <div className="guild-tab-container">
                    {/* 좌측 비어있는 공간 */}
                </div>
                <div className="event-tab-container">
                    <HomeEventTab onEventClick={handleEventClick} />
                </div>
            </div>
            
        </div>
        </div>
    );
};

export default HomePage;