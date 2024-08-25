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

const CreateButton = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  &:hover {
    background-color: #45a049;
  }
`;
const HomeButton = styled(Link)`
  padding: 10px 20px;
  background-color: #f0f0f0;
  color: #333;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;

// 1. 게임선택하는 GameList

// 2. 길드 검색하는 SearchInput , 옆에 생성 버튼 >> GuildCreateModal

// 3. GuildList 목록. GuildItem 으로 각각의 guild 들 데리고 옴. 
// 4. 밑에 홈으로 가기 버튼 >> navigate. 그 옆에 현재 누른 길드 갯수 /5 개. 

// get 요청을 보냈을 시 이 데이터를 받아야 하는 GuildList. >> guilds 데이터를 받음. 
// 
const GuildListPage = () => {
    const [guildList, setGuildList] = useState([
        {
            guildId: 1,
            gameId: 1,
            guildName: '오버워치 길드',
            guildCurrentPopulation: 50,
            guildTotalPopulation: 100,
            guildContent: '오버워치 길드입니다.'
        },
        {
            guildId: 2,
            gameId: 4,
            guildName: 'LoL 길드',
            guildCurrentPopulation: 5,
            guildTotalPopulation: 50,
            guildContent: '롤 길드입니다.'
        }
    ]);
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
    const filteredGuildList = guildList.filter(guild => 
        guild.guildName.toLowerCase().includes(searchGuild.toLowerCase())
    );
    
    // api 요청은 상위에서 다 해야 한다고?
    // get /guilds >> guildList
    // get /guilds/{guildId} >> selectedGuild
    // post /guilds/{guildId}/registration 이건 길드 상세 조회 모달에서 하는데 여기 상위에서 해야 되나?
    // post /guilds/{guildId} 이건 길드 생성 모달에서 하는데?
    // 길드들을 다 데리고 옴. 

    // useEffect(() => {
    //     fetchGuilds();
    // }, []);
    // const fetchGuilds = async () => {
    //     setIsLoading(true);
    //     try {
    //         const response = await axios.get('/guilds');
    //         setGuildList(response.data);
    //     } 
    //     finally {
    //         setIsLoading(false);
    //     }
    // };

    //생성된 길드가 즉시 길드 목록에 추가되는게 맞는가!!!! 
    // 새로운 길드가 성공적으로 생성되었을 때 호출되는 콜백 함수. 
    const handleCreateSuccess = (newGuild) => {
        // guildList 상태를 새로운 배열로 업데이트함. 
        setGuildList([newGuild, ...guildList]);
    };

    return (
        <div>
            <GlobalHeader />
            <div className="main">
                <GameList/>
                <div>
                    <SearchInput onSearch={handleSearch}/>
                    <CreateButton onClick={openCreateModal}>
                        길드 생성
                    </CreateButton>
                    <GuildCreateModal
                    isOpen={isCreateModalOpen}
                    onClose={closeCreateModal}
                    onCreateSuccess={handleCreateSuccess}
                    />
                </div>
                    <GuildList list={filteredGuildList}/>
                <div>
                    <HomeButton to="/home">홈으로 가기</HomeButton>
                    <div>
                        <span> 0 </span>
                        <span> / 5 </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuildListPage;