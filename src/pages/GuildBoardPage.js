import React from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import Header from './HomeHeader';
import './HomePage.css'

const GuildBoardPage = () => {
    const { id } = useParams();
    return (
        <div>
            <Header/>
            <div className='main'>
                Guild Board for ID :{id}
            </div>
        </div>
    )
};
export default GuildBoardPage;
