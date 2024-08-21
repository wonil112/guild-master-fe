import React from 'react';
import Header from './HomeHeader';
import './ManagePage.css';
import ManagePlayerTab from '../component/ManagePlayerTab';

const TempComponent = () => <div>Temporary Component</div>;

const ManagePage = () => {
    return (
        <div className="manage-container">
            <Header />
            <div className="manage-content">
                <h1>길드원 관리</h1>
                <div className="guild-member-list">
                    <ManagePlayerTab/>
                </div>
            </div>
        </div>
    );
};

export default ManagePage;