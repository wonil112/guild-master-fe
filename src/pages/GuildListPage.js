import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import '../Global.css';
import GlobalHeader from './GlobalHeader';
import GameList from '../component/GuildListPage/GameList'
import SearchInput from '../component/GuildListPage/SearchInput'
import GuildList from '../component/GuildListPage/GuildList';
import GuildCreateModal from '../component/GuildListPage/GuildCreateModal';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 90vh;
  margin-top: 15px;
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 80px; // 상단 패딩을 GlobalHeader 높이보다 약간 더 크게 설정
  flex-grow: 1;
`;

const ContentWrapper = styled.div`
  width: 800px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 300px;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 40px;
`;

const SearchInputWrapper = styled.div`
  flex-grow: 1;
  height: 100%;
  margin-right: 10px;
`;

const CreateButton = styled.button`
  padding: 0px 20px;
  height: 100%;
  background-color: #FFFFFF;
  color: #2B0B3F;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
`;

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  position: relative;
`;

const HomeButton = styled(Link)`
  padding: 10px 20px;
  background-color: #1E0E2F;
  color: #FFFFFF;
  text-decoration: none;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;

const GuildCounter = styled.div`
  color: #FFFFFF;
  font-size: 16px;
  position: absolute;
  right: 0;
`;


// 1. 게임선택하는 GameList

// 2. 길드 검색하는 SearchInput , 옆에 생성 버튼 >> GuildCreateModal

// 3. GuildList 목록. GuildItem 으로 각각의 guild 들 데리고 옴. 
// 4. 밑에 홈으로 가기 버튼 >> navigate. 그 옆에 현재 누른 길드 갯수 /5 개. 

// get 요청을 보냈을 시 이 데이터를 받아야 하는 GuildList. >> guilds 데이터를 받음. 
// 
const GuildListPage = () => {
    const [guildList, setGuildList] = useState([]);
    // 길드 생성 모달에 대한 상태. 생성 버튼을 누르면, 모달이 뜨도록 함. ture 로 바뀜. 
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const openCreateModal = () => {
        setIsCreateModalOpen(true);
    };
    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    //검색 기능 구현........ 
    const [searchGuild, setSearchGuild ] = useState('');

    const handleSearch = (guild) => {
        setSearchGuild(guild);
    }
    // 검색 기능. guildList 는 현재 있는 길드와, post 요청이 성공했을 때 업데이트 되는
    // newGuild 까지 포함되어 있음. 여기서 필터를 사용해서 이름을 검색하면 그에 
    // 해당하는 길드만 뜸. 
    const filteredGuildList = Array.isArray(guildList) 
        ? guildList.filter(guild => 
            guild && guild.guildName && guild.guildName.toLowerCase().includes((searchGuild || '').toLowerCase())
          )
        : [];
  
    // api 요청은 상위에서 다 해야 한다고?
    // get /guilds >> guildList
    // get /guilds/{guildId} >> selectedGuild
    // post /guilds/{guildId}/registration 이건 길드 상세 조회 모달에서 하는데 여기 상위에서 해야 되나?
    // post /guilds/{guildId} 이건 길드 생성 모달에서 하는데?
    // 길드들을 다 데리고 옴. 

    // 최초 한번만 되게. 
    useEffect(() => {
        fetchGuilds();
    }, []);

    const fetchGuilds = async () => {
      try {
          const response = await axios.get('/guilds?page=1&size=100');
          setGuildList(response.data.data);
      }
        finally {
        }
    };

    //생성된 길드가 즉시 길드 목록에 추가되는게 맞는가!!!! 
    // 새로운 길드가 성공적으로 생성되었을 때 호출되는 콜백 함수. 
    const handleCreateSuccess = async (newGuild) => {
        // guildList 상태를 새로운 배열로 업데이트함. 
        setGuildList([newGuild, ...guildList]);
        await fetchGuilds();
    };

    return (
        <PageContainer>
            <GlobalHeader />
            <MainContent>
                <GameList/>
                <ContentWrapper>
                    <SearchWrapper>
                        <SearchInputWrapper>
                            <SearchInput onSearch={handleSearch}/>
                        </SearchInputWrapper>
                        <CreateButton onClick={openCreateModal}>
                            길드 생성
                        </CreateButton>
                    </SearchWrapper>
                    <GuildList list={filteredGuildList}/>
                    <GuildCreateModal
                    isOpen={isCreateModalOpen}
                    onClose={closeCreateModal}
                    onCreateSuccess={handleCreateSuccess}
                    />
                </ContentWrapper>
                <FooterWrapper>
                    <HomeButton to="/home">홈으로 가기</HomeButton>
                    <GuildCounter>
                        <span> 0 </span>
                        <span> / 5 </span>
                    </GuildCounter>
                </FooterWrapper>
            </MainContent>
        </PageContainer>
    );
};

export default GuildListPage;