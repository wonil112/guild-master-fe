import React, {useState, useEffect } from 'react';
import axios from 'axios';
import '../Global.css';
import GlobalHeader from './GlobalHeader';
import GameList from '../component/GuildListPage/GameList'
import SearchInput from '../component/GuildListPage/SearchInput'
import GuildList from '../component/GuildListPage/GuildList';
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
            guildTotalPopulation: 100
        },
        {
            guildId: 2,
            gameId: 4,
            guildName: 'LoL 길드',
            guildCurrentPopulation: 5,
            guildTotalPopulation: 50
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);

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

    return (
        <div>
            <GlobalHeader />
            <div className="main">
                <GameList/>
                <div>
                    <SearchInput/>
                    <button>생성</button>
                </div>
                {isLoading ? (
                    <div>로딩 중...</div>
                ) : (
                    <GuildList list={guildList}/>
                )}
                <div>
                    <button>홈으로 가기</button>
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