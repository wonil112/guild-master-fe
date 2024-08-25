import React from 'react';
import '../Global.css';
import GlobalHeader from './GlobalHeader';

const ManagePage = () => {
    return (
        <div>
            <GlobalHeader />
            <div className="main">
                <h1>관리</h1>
            </div>
        </div>
    );
};

export default ManagePage;