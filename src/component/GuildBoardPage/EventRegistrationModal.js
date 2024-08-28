import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Modal from '../Modal';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Column = styled.div`
  flex: 1;
  margin: 0 10px;
`;

const DropdownSelect = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;

const EventRegistrationModal = ({ isOpen, onClose, gameDetails, eventId }) => {
  const [selectedPosition, setSelectedPosition] = useState('');
  const [tier, setTier] = useState('');

  const handlePositionChange = (e) => {
    setSelectedPosition(e.target.value);
  };

  const handleTierChange = (e) => {
    setTier(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/events/registration', 
        {
          eventId: eventId,
          gameTier: tier,
          selectedPosition: selectedPosition
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log('신청 성공:', response.data);
      onClose(); // 신청 후 모달 닫기
    } catch (error) {
      console.error('신청 실패:', error);
      // 에러 처리 로직 (예: 사용자에게 에러 메시지 표시)
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="이벤트 참가 신청">
      <FormContainer>
        <Row>
          <Column>
            <h3>포지션 선택</h3>
            <DropdownSelect value={selectedPosition} onChange={handlePositionChange}>
              <option value="">포지션을 선택하세요</option>
              {gameDetails?.positionList.map((position) => (
                <option key={position.positionId} value={position.positionName}>
                  {position.positionName}
                </option>
              ))}
            </DropdownSelect>
          </Column>
          <Column>
            <h3>티어</h3>
            <Input 
              id="tierInput"
              value={tier}
              onChange={handleTierChange}
              placeholder="티어를 입력하세요" 
              aria-label="티어 입력"
            />
          </Column>
        </Row>
        <SubmitButton onClick={handleSubmit}>신청하기</SubmitButton>
      </FormContainer>
    </Modal>
  );
};

export default EventRegistrationModal;