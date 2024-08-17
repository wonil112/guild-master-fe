import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './HomeHeader';
import './HomePage.css'

const HomePage = () => {
    return (
        <div>
            <Header/>
            <div className='main'></div>
        </div>
    )
};
export default HomePage;