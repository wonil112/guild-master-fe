import React, { useState } from 'react';
import GuildItem from "./GuildItem";
import GuildDetailModal from "./GuildDetailModal"; 
// 상위에서 받은 데이터를 guildItem 에 뿌려줌. 
// guild.gameId, guild.guildName,  
// guild.guildCurrentPopulation ,guild.guildTotalPopulation

const GuildList = ({ list = [] }) => {
    // 길드 item 하나를 누르면 모달이 떠야 함. >> guildId 에 대한 상태. 
    const [selectedGuildId, setSelectedGuildId] = useState(null);
    // 길드 하나에 대한 상세 내용 상태. 을 modal 로 띄워 줘야 함. 
    const [guildDetails, setGuildDetails] = useState(null);
    
    // selectedGuildId 가 존재할 때에만 fetchGuildDetails 함수를 호출함.
    // 길드를 선택해서, sectedGuildId 가 바뀔 때마다 해당 길드의 상세 정보를 가져옴. 
    // useEffect(() => {
    //     if (selectedGuildId) {
    //         fetchGuildDetails(selectedGuildId);
    //     }
    // }, [selectedGuildId]);
    const fetchGuildDetails = async (guildId) => {
        // try {
        //     const response = await axios.get(`/guilds/${guildId}`);
        //     // guild 정보에 대한 상태? 
        //     setGuildDetails(response.data);
        // } catch (error) {
        //     console.error("Error fetching guild details:", error);
        // }
    };

    // guildItem 을 클릭하면 guildId 에 해당하는 상세 정보모달이 가 뜸.  
    const handleGuildClick = (guildId) => {
        setSelectedGuildId(guildId);
    }
   // 모달 버튼을 닫으면 selectedGuildId 가 null 이 됨. 
    const closeModal = () => {
        setSelectedGuildId(null);
    }



    if(list.length === 0 ) {
        return <div> 길드가 없습니다. </div>
    }

    return (
        <>
            {list.map(({ guildId, gameId, guildName, guildCurrentPopulation, guildTotalPopulation }) => (
                <GuildItem
                    key={guildId}
                    gameId={gameId}
                    guildName={guildName}
                    guildCurrentPopulation={guildCurrentPopulation}
                    guildTotalPopulation={guildTotalPopulation}
                    onClick={() => handleGuildClick(guildId)}
                />
            ))}
            {selectedGuildId && guildDetails && (
                <GuildDetailModal
                    guildDetails={guildDetails}
                    onClose={closeModal}
                />
            )}
        </>
    );

}
export default GuildList;    