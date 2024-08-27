import React from 'react';
import '../Global.css';
import GlobalHeader from './GlobalHeader';
import ManagePlayerTab from '../component/ManagePage/ManagePlayerTab';

const ManagePage = () => {
    return (
        <div>
            <GlobalHeader />
            <div className="main">
                <ManagePlayerTab/>
            </div>
        </div>
    );
};

export default ManagePage;