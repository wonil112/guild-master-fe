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
  border-bottom: 1px solid #ddd;
`;


const WaitPlayersItem = ({memberId, nickName, createdAt, guildId}) => {
    const [isAccepted, setIsAccepted] = useState(false);

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
            <TableCell>{createdAt}</TableCell>
            <TableCell>
                <button onClick={handleRegistrationChange} disabled={isAccepted}>
                    {isAccepted ? '가입 승인됨' : '가입 승인'}
                </button>
            </TableCell>
        </TableRow>
    );
};

export default WaitPlayersItem;