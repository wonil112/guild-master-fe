import React from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import Header from './HomeHeader';
import './HomePage.css'
import GuildEventTab from '../component/GuildEventTab';

const GuildBoardPage = () => {
    const { id } = useParams();
    return (
        <div>
            <Header/>
            <div className='main'>
                Guild Board for ID :{id}
                <GuildEventTab guildId ={parseInt(id, 10)}/>
            </div>
            
        </div>
    )
};
export default GuildBoardPage;
