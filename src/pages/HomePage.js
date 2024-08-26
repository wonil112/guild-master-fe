import React from 'react';
import '../Global.css';
import axios from 'axios';
import styled from 'styled-components';
import GlobalHeader from './GlobalHeader';
import MyGuildList from '../component/HomePage/MyGuildList';
import MyEventList from '../component/HomePage/MyEventList';
import { useEffect, useState } from 'react';


const MainContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 15px;
  padding: 20px;
  flex-grow: 1;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 150px;
  width: 1300px;
  height: 700px;
  gap: 50px;
`;

const ListContainer = styled.div`
  width: 48%;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ListTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
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

    const [memberEvents, setMemberEvents] = useState([]);
    
    // memberId 에 대한 조회를 하면 가입한 길드들이 조회가 됨. 
    useEffect(() => {
        const fetchMemberGuilds = async () => {
            try {
                const response = await axios.get(`/members/${memberId}`);
                setMemberGuilds(response.data.data.memberGuilds);
            } catch (error) {
                console.error('Error fetching member guilds:', error);
            }
        };

        fetchMemberGuilds();
    }, [memberId]);

    useEffect(() => {
        const fetchMemberEvents = async () => {
            try {
                const response = await axios.get(`/events/members/${memberId}`);
                // response dto 확인하기. 
                setMemberEvents(response.data);
            } catch (error) {
                console.error('Error fetching member guilds:', error);
            }
        };

        fetchMemberEvents();
    }, [memberId]);


    return (
        <>
        <GlobalHeader />
        <MainContainer>
          <ContentWrapper>
            <ListContainer>
              <ListTitle>내 길드 목록</ListTitle>
              <MyGuildList list={memberGuilds} />
            </ListContainer>
            <ListContainer>
              <ListTitle>신청 이벤트 목록</ListTitle>
              <MyEventList list={memberEvents} />
            </ListContainer>
          </ContentWrapper>
        </MainContainer>
      </>
    );
};

export default HomePage;