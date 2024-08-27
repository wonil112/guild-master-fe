import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const GuildEventCreateModal = ({ isOpen, onClose, onEventCreateSuccess }) => {
  const { guildId } = useParams();
  const [eventName, setEventName] = useState('');
  const [maxMembers, setMaxMembers] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [eventContent, setEventContent] = useState('');
  const [error, setError] = useState('');
  // 제출 중인지 여부를 확인함. 제출 시작시 true, 완료 시 false
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 모달이 닫히면 모든 상태를 초기화함. 
  useEffect(() => {
    if (!isOpen) {
      setEventName('');
      setMaxMembers('');
      setStartDate('');
      setDueDate('');
      setEventContent('');
      setError('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const formatDate = (dateString) => {
    const [datePart, timePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');
    return new Date(year, month - 1, day, hours, minutes);
  };




// 생성버튼을 누르면 post 요청이 갈 것임. 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
     if (!eventName || !maxMembers || !startDate || !dueDate || !eventContent) {
        setError('모든 필드를 입력해주세요.');
        setIsSubmitting(false); 
        return;
    }

    try {
      const token = localStorage.getItem('token'); // 토큰을 로컬 스토리지에서 가져옵니다.
      const response = await axios.post('/events', 
        {
          guildId,
          eventName,
          eventTotalPopulation: maxMembers,
          startDate: formatDate(startDate),
          dueDate: formatDate(dueDate),
          eventContent
        },
        {
          headers: {
            Authorization: `${token}` // Authorization 헤더에 토큰을 추가합니다.
          }
        }
      );
      //생성이 성공되면 그 응답 내용. 새로 생성된 길드의 정보가 포함됨. 
      // 그리고 이게 부모 컴포넌트 (guildListPage)에 정의가 되어 있고, 
      // 그곳에서 데이터를 받아서 목록 상태를 업데이트 할 것임. 
      onEventCreateSuccess(response.data.data);
      onClose();
    } catch (err) {
      setError('이벤트 생성에 실패했습니다. 다시 시도해주세요.');
      console.error(err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="이벤트 생성"
    >
      <CreateContainer>
        <InputGroup>
          <Label htmlFor="eventName">이벤트명</Label>
          <Input
            id="eventName"
            type="text"
            placeholder="이벤트명을 입력하세요"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
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
          <Label htmlFor="startDate">시작 날짜</Label>
          <Input
            id="startDate"
            type="datetime-local"
            placeholder="YYYY-MM-DD/HH:MM"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            pattern="\d{4}-\d{2}-\d{2}"
            required
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="dueDate">종료 날짜</Label>
          <Input
            id="dueDate"
            type="datetime-local"
            placeholder="YYYY-MM-DD/HH:MM"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            pattern="\d{4}-\d{2}-\d{2}"
            required
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="eventContent">이벤트 설명</Label>
          <TextArea
            id="eventContent"
            type="text"
            placeholder="길드 소개를 입력하세요"
            value={eventContent}
            onChange={(e) => setEventContent(e.target.value)}
            required
          />
        </InputGroup>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? '생성 중...' : '길드 생성'}
        </Button>
      </CreateContainer>
    </Modal>
  );
};

export default GuildEventCreateModal;