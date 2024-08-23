import React from 'react';
import '../Global.css';
import GlobalHeader from '../header/GlobalHeader';

const MyPage = () => {
    return (
        <div>
            <GlobalHeader />
            <div className="main">
                <h1>마이페이지</h1>
            </div>
        </div>
    );
};

export default MyPage;