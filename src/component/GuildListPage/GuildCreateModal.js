import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Modal from '../Modal';

const CreateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;


const Button = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const GuildCreateModal = ({ isOpen, onClose, onCreateSuccess }) => {
  const [guildName, setGuildName] = useState('');
  const [gameId, setGameId] = useState('');
  const [maxMembers, setMaxMembers] = useState('');
  const [masterNickname, setMasterNickname] = useState('');
  const [guildContent, setGuildContent] = useState('');
  const [error, setError] = useState('');
  // 제출 중인지 여부를 확인함. 제출 시작시 true, 완료 시 false
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 모달이 닫히면 모든 상태를 초기화함. 
  useEffect(() => {
    if (!isOpen) {
      setGuildName('');
      setGameId('');
      setMaxMembers('');
      setMasterNickname('');
      setGuildContent('');
      setError('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

// 생성버튼을 누르면 post 요청이 갈 것임. 
  const handleSubmit = async (e) => {
    setError('');
    setIsSubmitting(true);
     if (!guildName || !gameId || !maxMembers || !masterNickname || !guildContent) {
        setError('모든 필드를 입력해주세요.');
        setIsSubmitting(false); 
        return;
    }
    try {
      const response = await axios.post('/guilds', {
        gameId,
        guildName,
        guildMasterName: masterNickname,
        guildTotalPopulation: maxMembers,
        guildContent
      });
      //생성이 성공되면 그 응답 내용. 새로 생성된 길드의 정보가 포함됨. 
      // 그리고 이게 부모 컴포넌트 (guildListPage)에 정의가 되어 있고, 
      // 그곳에서 데이터를 받아서 목록 상태를 업데이트 할 것임. 
      onCreateSuccess(response.data);
      onClose();
    } catch (err) {
      setError('길드 생성에 실패했습니다. 다시 시도해주세요.');
      console.error(err);
    }
  };

  const content = (
    <CreateContainer>
        <InputGroup>
            <Label htmlFor="guildName">길드명</Label>
            <Input
            id="guildName"
            type="text"
            placeholder="길드명을 입력하세요"
            value={guildName}
            onChange={(e) => setGuildName(e.target.value)}
            required
            />
        </InputGroup>

        <InputGroup>
            <Label htmlFor="gameId">게임</Label>
            <Select
            id="gameId"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            required
            >
            <option value="">게임 선택</option>
            <option value="1">오버워치</option>
            <option value="2">발로란트</option>
            <option value="3">리그오브레전드</option>
            <option value="4">로스트아크</option>
            </Select>
        </InputGroup>

        <InputGroup>
            <Label htmlFor="maxMembers">최대 인원수</Label>
            <Input
            id="maxMembers"
            type="number"
            placeholder="최대 인원수를 입력하세요"
            value={maxMembers}
            onChange={(e) => setMaxMembers(e.target.value)}
            required
            />
        </InputGroup>

        <InputGroup>
            <Label htmlFor="masterNickname">마스터 닉네임</Label>
            <Input
            id="masterNickname"
            type="text"
            placeholder="마스터 닉네임을 입력하세요"
            value={masterNickname}
            onChange={(e) => setMasterNickname(e.target.value)}
            required
            />
        </InputGroup>

        <InputGroup>
            <Label htmlFor="guildContent">길드 소개</Label>
            <Input
            id="guildContent"
            type="text"
            placeholder="길드 소개를 입력하세요"
            value={guildContent}
            onChange={(e) => setGuildContent(e.target.value)}
            required
            />
        </InputGroup>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </CreateContainer>
  );

  const footer = (
    <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
      {isSubmitting ? '생성 중...' : '길드 생성'}
    </Button>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="길드 생성"
      content={content}
      footer={footer}
    />
  );
};

export default GuildCreateModal;