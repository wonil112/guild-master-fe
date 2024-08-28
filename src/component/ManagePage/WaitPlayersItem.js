import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';


const TableRow = styled.tr`
    background-color: rgba(135, 206, 250, 0.2); // 연한 하늘색
    &:hover {
        background-color: rgba(135, 206, 250, 0.3); // 호버 시 약간 더 진한 하늘색
    }
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
`;

const StyledButton = styled.button`
  background-color: ${props => props.disabled ? '#cccccc' : '#4CAF50'};
  color: white;
  padding: 8px 2px;
  border: none;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 14px;
  transition: background-color 0.3s ease;
  width: 80px;  // 고정 너비 설정
  white-space: nowrap;  // 텍스트 줄바꿈 방지

  &:hover {
    background-color: ${props => props.disabled ? '#cccccc' : '#45a049'};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.5);
  }
`;

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};


const WaitPlayersItem = ({memberId, nickName, createdAt, guildId}) => {
    const [isAccepted, setIsAccepted] = useState(false);

    const formattedDate = formatDate(createdAt);

    useEffect(() => {

    }, [memberId]);

    const handleRegistrationChange = async () => {
        try {
            const token = localStorage.getItem('token'); // 토큰이 로컬 스토리지에 저장되어 있다고 가정
            const response = await axios.post(
                `/guilds/${guildId}/members/${memberId}/accept`,
                {
                    memberId: memberId,
                    nickname: nickName
                },
                {
                    headers: {
                        'Authorization': `${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                setIsAccepted(true);
                console.log('Member accepted successfully');
                // 여기에 성공 후 추가 로직을 넣을 수 있습니다 (예: 부모 컴포넌트에 알림)
            }
        } catch (error) {
            console.error('Error accepting member:', error);
            // 여기에 에러 처리 로직을 넣을 수 있습니다
        }
    };

    return (
        <TableRow>
            <TableCell>{nickName}</TableCell>
            <TableCell>{formattedDate}</TableCell>
            <TableCell>
                <StyledButton onClick={handleRegistrationChange} disabled={isAccepted}>
                    {isAccepted ? '승인완료' : '승인'}
                </StyledButton>
            </TableCell>
        </TableRow>
    );
};

export default WaitPlayersItem;