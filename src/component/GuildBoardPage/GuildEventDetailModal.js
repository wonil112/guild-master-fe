import React, {useState} from 'react';
// 닫기 버튼 수행
// 가입하기 버튼 수행.
// guildData에서 원하는 정보를 보여줌. 
import styled from 'styled-components'
import Modal from '../Modal'
import axios from 'axios';

const GuildInfo = styled.div`
  margin-bottom: 10px;
`;

const ApplyButton = styled.button`
  padding: 10px 20px;
  border: none;
  font-weight: bold;
  font-size: 16px;
  border-radius: 20px;
  cursor: pointer;
  background-color: #000000;
  color: white;
`;

const NicknameInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0,123,255,.25);
  }

  &::placeholder {
    color: #999;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: center;
`;

const GuildDetailModal = ({ isOpen, onClose, guildDetails, onApply }) => {

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

  export default GuildDetailModal;