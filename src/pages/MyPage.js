import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './HomeHeader';

const MyPage = () => {
    return (
        <div>
            <Header/>
            <div className='main'></div>
        </div>
    )
};
export default MyPage;