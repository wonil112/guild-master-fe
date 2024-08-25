import React from 'react';
import '../Global.css';
import axios from 'axios';
import styled from 'styled-components';
import GlobalHeader from './GlobalHeader';
import MyGuildList from '../component/HomePage/MyGuildList';
import MyEventList from '../component/HomePage/MyEventList';
import { useEffect, useState } from 'react';


const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const ListContainer = styled.div`
  width: 48%;
`;

// 1. 우측 MyGuildList 좌측 MyEventList(내가 참석한 이벤트만 뜨는 List)
// 2. MyGuildList GuildItem 에서 필요한 것. >> page 에서 get /membmers/{member-id} 의 response.data.memberGuildDtos.
// 를 받아서 내려주어야 함.
// 3. MyEventList EventItem 에서 필요한 것. >> get /events/members ??????????????? response.data. 
// 4. 

const HomePage = () => {
    // api 로 받은 데이터를 밑에서 조회함. 
    const [memberGuilds, setMemberGuilds] = useState([]);
    // const memberId = 2; // 나중에 로그인 했을 때. localstorage 에 저장된 걸로. 
    //레디스를 적용하면.. 토큰은 로킬스토리지가 아닌 레디스에 있는 거??
    const memberId = localStorage.getItem('memberId');
    
    // memberId 에 대한 조회를 하면 가입한 길드들이 조회가 됨. 
    useEffect(() => {
        const fetchMemberGuilds = async () => {
            try {
                const response = await axios.get(`/members/${memberId}`);
                console.log('Current memberGuilds:', response.data.data.memberGuilds);
                console.log('Is array?', Array.isArray(response.data.data.memberGuilds));
                setMemberGuilds(response.data.data.memberGuilds);
            } catch (error) {
                console.error('Error fetching member guilds:', error);
            }
        };

        fetchMemberGuilds();
    }, [memberId]);


    return (
        <div>
            <GlobalHeader/>
            <MainContainer>
                <ListContainer>
                    <MyGuildList list={memberGuilds}/>
                </ListContainer>
                <ListContainer>
                    <MyEventList list={MyEventList}/>
                </ListContainer>
            </MainContainer>
        </div>
    );
};

export default HomePage;