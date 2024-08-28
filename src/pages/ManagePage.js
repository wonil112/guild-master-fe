import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../Global.css';
import GlobalHeader from './GlobalHeader';
import ManagePlayerTab from '../component/ManagePage/ManagePlayerTab';
import styled from 'styled-components';
import PlayerList from '../component/ManagePage/PlayerList'
import WaitList from '../component/ManagePage/WaitList'

const ManagePageWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// guilds/{guild-id}/members >> 길드에 참여한 길드원을 내려주어야 함. 
// status 가 active 이면 playerlist 에 넣어줌. 
// status 가 wait 이면 Waitlist 에 넣어줌. 
const ManagePage = () => {
    const { guildId } = useParams(); 
    const [playerList, setPlayerList] = useState([]);
    const [waitList, setWaitList] = useState([]);

    useEffect(() => {

        fetchMemberData();
    }, [guildId]); // guildId가 변경 될 때마다 데이터를 다시 불러옴. 

    const fetchMemberData = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`/guilds/${guildId}/members`, {
                headers: {
                    'Authorization': `${token}`
                }
            });

            const memberData = response.data.data.memberGuildDtos;
            
            const activePlayers = memberData.filter(member => 
                member.memberGuildStatuses.includes('MEMBER_GUILD_STATUS_ACTIVE')
            );

            const waitingPlayers = memberData.filter(member => 
                !member.memberGuildStatuses.includes('MEMBER_GUILD_STATUS_ACTIVE')
            );

            setPlayerList(activePlayers);
            setWaitList(waitingPlayers);

        } catch (error) {
            console.error("Error fetching member data:", error);
        }
        
    };


    

    return (
        <div>
            <GlobalHeader />
            <ManagePageWrapper>
            <div className="main">
                {/* <ManagePlayerTab/> */}
                <PlayerList list={playerList} />
                <WaitList list={waitList} />
            </div>
            </ManagePageWrapper>
        </div>
    );
};

export default ManagePage;