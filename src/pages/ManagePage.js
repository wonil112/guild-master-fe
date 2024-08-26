import React from 'react';
import '../Global.css';
import GlobalHeader from './GlobalHeader';
import ManagePlayerTab from '../component/ManagePage/ManagePlayerTab';

const ManagePage = () => {
    return (
        <div>
            <GlobalHeader />
            <div className="main">
                <h1>관리</h1>
                <ManagePlayerTab/>
            </div>
        </div>
    );
};

export default ManagePage;