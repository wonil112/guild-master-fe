import React, { useState, useEffect } from 'react';
import GuildItem from "./GuildItem";
import axios from 'axios';
import GuildDetailModal from "./GuildDetailModal"; 
// 상위에서 받은 데이터를 guildItem 에 뿌려줌. 
// guild.gameId, guild.guildName,  
// guild.guildCurrentPopulation ,guild.guildTotalPopulation

const GuildList = ({ list = [] }) => {
    // 길드 item 하나를 누르면 모달이 떠야 함. >> guildId 에 대한 상태. 
    const [selectedGuildId, setSelectedGuildId] = useState(null);

    // 길드 하나에 대한 상세 내용 상태. 을 modal 로 띄워 줘야 함. 
    const [guildDetails, setGuildDetails] = useState(null);

    // 가입 신청했는지, 클라이언트 측에서 상태 변경. 원래는 서버에서 받음... api 가 있는지 
    // 확실하지 않음. 
    const [pendingApplications, setPendingApplications] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // selectedGuildId 가 존재할 때에만 fetchGuildDetails 함수를 호출함.
    // 길드를 선택해서, sectedGuildId 가 바뀔 때마다 해당 길드의 상세 정보를 가져옴. 
    useEffect(() => {
        if (selectedGuildId) {
            fetchGuildDetails(selectedGuildId);
        }
    }, [selectedGuildId]);

    const fetchGuildDetails = async (guildId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/guilds/${guildId}`, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            // guild 정보에 대한 상태? 
            setGuildDetails(response.data.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching guild details:", error);
        }
    };

    // guildItem 을 클릭하면 guildId 에 해당하는 상세 정보모달이 가 뜸.  
    const handleGuildClick = (guildId) => {
        setSelectedGuildId(guildId);
    }
   // 모달 버튼을 닫으면 selectedGuildId 가 null 이 됨. 
    const closeModal = () => {
        setSelectedGuildId(null);
        setGuildDetails(null);
        setIsModalOpen(false);
    }

    // 길드 신청하는 api 요청. 
    // 근데 이 로직은 guild detail modal에서 수행하는 게 아닌가? 
    // 상위에서 데이터를 내려줘야 하는거며는..... 여기서 해야 하는게 맞는건가?
    // GuildListPage 에서 해야 하는 게 아닌가? 아닌가 ? ? ? ? 
    // const applyToGuild = async (nickname) => {
    //     try {
    //         const response = await axios.post(`/guilds/${selectedGuildId}/registration`, {
    //             nickname: nickname
    //           });
    //         // 사용자의 길드 가입 신청 상태를 관리함...?
    //         alert('가입 신청에 성공했습니다.')
    //         // 길드 신청을 관리하는 것. 밑에 item 에 이 정보를 내려서, 거기서 가입 대기. 
    //         // 글씨가 나오도록 할 것임. 
    //         setPendingApplications(prev => ({ ...prev, [guildId]: true }));

    //         closeModal();
    //     } catch (error) {
    //         alert('가입 신청에 실패했습니다.');
    //         console.error("Error applying to guild:", error);
    //     }
    // }



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
                    isPending={pendingApplications[guildId]}
                />
            ))}
            {selectedGuildId && guildDetails && (
                <GuildDetailModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    guildDetails={guildDetails}
                />
            )}
        </>
    );

}
export default GuildList;    