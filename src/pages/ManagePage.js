import React from 'react';
import Header from './HomeHeader';
import './ManagePage.css';

const ManagePage = () => {
    return (
        <div className="manage-container">
            <Header />
            <div className="manage-content">
                <h1>길드원 관리</h1>
                <div className="guild-member-list">
                    {/* 여기에 길드원 목록과 관리 기능을 추가하세요 */}
                </div>
            </div>
        </div>
    );
};

export default ManagePage;