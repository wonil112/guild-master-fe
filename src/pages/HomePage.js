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
  margin-top: 80px;
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
    

    const [memberEvents, setMemberEvents] = useState([]);
    
    // memberId 에 대한 조회를 하면 가입한 길드들이 조회가 됨. 
    const memberId = localStorage.getItem('memberId');
    useEffect(() => {
      const fetchMemberGuilds = async () => {
          try {
              const token = localStorage.getItem('token'); // 토큰을 로컬 스토리지에서 가져옵니다.
              
              const response = await axios.get(`/members/${memberId}`, {
                  headers: {
                      'Authorization': `${token}` // 헤더에 토큰을 추가합니다.
                  }
              });
              
              setMemberGuilds(response.data.data.memberGuilds);
          } catch (error) {
              console.error('Error fetching member guilds:', error);
              // 에러 처리 로직을 추가할 수 있습니다. 예: 사용자에게 에러 메시지 표시
          }
      };
  
      if (memberId) {
          fetchMemberGuilds();
      }
  }, [memberId]);

    useEffect(() => {
        const fetchMemberEvents = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
                const response = await axios.get(`/events/members/${memberId}?page=1&size=100`, {
                    headers: {
                        Authorization: `${token}`
                    }
                });
                setMemberEvents(response.data.data);
            } catch (error) {
                console.error('Error fetching member guilds:', error);
            }
        };

        fetchMemberEvents();
    }, [memberId]);


    return (
        <>
        <GlobalHeader/>
        <MainContainer>
          <ContentWrapper>
            <ListContainer>
              <ListTitle>내 길드 목록</ListTitle>
              <MyGuildList list={memberGuilds}/>
            </ListContainer>
            <ListContainer>
              <ListTitle>신청 이벤트 목록</ListTitle>
              <MyEventList list={memberEvents}/>
            </ListContainer>
          </ContentWrapper>
        </MainContainer>
      </>
    );
};

export default HomePage;