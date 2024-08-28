import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


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

const RoleSelect = styled.select`
  padding: 5px;
  width: 70%;
`;

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const PlayersItem = ({memberId, nickName, memberGuildRoles, createdAt}) => {
    const [currentRole, setCurrentRole] = useState('');
    const roleOrder = ['MEMBER_GUILD_ROLE_MASTER', 'MEMBER_GUILD_ROLE_MANAGER', 'MEMBER_GUILD_ROLE_PLAYER'];
    // /guilds/{guild-id}/members/{member-id}

    const formattedDate = formatDate(createdAt);

    useEffect(() => {
        // 가장 높은 권한을 찾아 초기값으로 설정
        for (let role of roleOrder) {
            if (memberGuildRoles.includes(role)) {
                setCurrentRole(role);
                break;
            }
        }
    }, [memberGuildRoles]);

    const handleRoleChange = (e) => {
        setCurrentRole(e.target.value);
        // 여기에 서버로 역할 변경을 요청하는 로직을 추가할 수 있습니다.
    };

    return (
        <TableRow>
            <TableCell>{nickName}</TableCell>
            <TableCell>{formattedDate}</TableCell>
            <TableCell>
                <RoleSelect value={currentRole} onChange={handleRoleChange}>
                    {roleOrder.map(role => (
                        <option key={role} value={role}>
                            {role.replace('MEMBER_GUILD_ROLE_', '')}
                        </option>
                    ))}
                </RoleSelect>
            </TableCell>
        </TableRow>
    );
};

export default PlayersItem;


