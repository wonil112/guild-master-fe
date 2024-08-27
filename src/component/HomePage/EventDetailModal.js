import React, {useState} from 'react';
// 닫기 버튼 수행
// 가입하기 버튼 수행.
// guildData에서 원하는 정보를 보여줌. 
import styled from 'styled-components'
import Modal from '../Modal'
import axios from 'axios';


const EventDetailModal = ({ isOpen, onClose, eventDetails, onApply }) => {

        // 가입 신청 시 닉네임을 받아서 post 요청을 보낼 것..
        const [nickname, setNickname] = useState('');
        const handleApply = async () => {
          const token = localStorage.getItem('token');
          try {
            const response = await axios.post(`/guilds/${guildDetails.guildId}/registration`, {
              guildId: guildDetails.guildId,
              nickname: nickname
            }, {headers: {
              Authorization: `${token}`
            }});
    
            if(response.status === 201) {
              alert('가입신청 성공');
              onApply(nickname);
              onClose();
            } else {
              alert('가입신청 실패');
            }
          } catch (error) {
            console.error("가입신청 오류 :", error);
            alert('가입신청 오류');
          }      
        };
    
        return (
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            title='길드 가입'
          >
            <GuildInfo>
              <p>게임: {guildDetails.guildName}</p>
              <p>인원: {guildDetails.guildCurrentPopulation} / {guildDetails.guildTotalPopulation}</p>
              <p>설명: {guildDetails.guildContent}</p>
            </GuildInfo>
            <NicknameInput
              type="text"
              placeholder="길드 내 사용할 닉네임을 입력하세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <ButtonContainer>
              <ApplyButton onClick={handleApply}>가입 신청</ApplyButton>
            </ButtonContainer>
          </Modal>
        );
      };
    