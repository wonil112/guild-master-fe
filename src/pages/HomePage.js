import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../component/Button';
import Modal from '../component/Modal';
import lolImage from '../img/lol_black.png';
import overwatchImage from '../img/overwatch_black.png'
import valorantImage from '../img/valorant_black.png'
import loastark from '../img/loastark_black.png'
import logo from '../logo/fulllogo_white_big.png'
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <Header />
            <MainContent />
        </div>
    );
};

const Header = () => {
    return (
        <header className="header">
            <img src={logo} alt="Guild Master Logo" className="logo" />
            <nav className="nav">
                <a href="/my-page" className="nav-link">My Page</a>
                <a href="/guild-search" className="nav-link">Guild Search</a>
                <button className="logout-button">Logout</button>
            </nav>
        </header>
    );
};

const MainContent = () => {
    return (
        <div className="main-content">
            <GuildList />
            <EventList />
        </div>
    );
};

const GuildList = () => {
    const [activeTab, setActiveTab] = useState('joined'); // 'joined', 'operated', 'waiting'

    return (
        <div className="guild-list">
            <div className="tabs">
                <button onClick={() => setActiveTab('joined')} className={activeTab === 'joined' ? 'active' : ''}>가입 길드</button>
                <button onClick={() => setActiveTab('operated')} className={activeTab === 'operated' ? 'active' : ''}>운영 길드</button>
                <button onClick={() => setActiveTab('waiting')} className={activeTab === 'waiting' ? 'active' : ''}>대기 길드</button>
            </div>
            <div className="tab-content">
                {activeTab === 'joined' && <div>길드 목록: 가입 길드</div>}
                {activeTab === 'operated' && <div>길드 목록: 운영 길드</div>}
                {activeTab === 'waiting' && <div>길드 목록: 대기 길드</div>}
            </div>
        </div>
    );
};

const EventList = () => {
    const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming', 'completed'

    return (
        <div className="event-list">
            <div className="tabs">
                <button onClick={() => setActiveTab('upcoming')} className={activeTab === 'upcoming' ? 'active' : ''}>참석한 이벤트</button>
                <button onClick={() => setActiveTab('completed')} className={activeTab === 'completed' ? 'active' : ''}>종료된 이벤트</button>
            </div>
            <div className="tab-content">
                {activeTab === 'upcoming' && <div>이벤트 목록: 참석한 이벤트</div>}
                {activeTab === 'completed' && <div>이벤트 목록: 종료된 이벤트</div>}
            </div>
        </div>
    );
};

export default HomePage;