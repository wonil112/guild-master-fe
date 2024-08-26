import React, { useState } from 'react';
import styled from 'styled-components';

const StyledPlayerItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

const PlayerNickname = styled.span`
  font-weight: bold;
  color: #000;
`;

const PlayerInfo = styled.span`
  margin-left: 10px;
`;

const PlayerRole = styled.select`
  margin-left: 10px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 14px;
  color: #000;
`;

const RetireButton = styled.button`
  // Add your button styles here
`;

const roleOptions = [
  { value: 'MEMBER_GUILD_ROLE_MASTER', label: '길드 마스터' },
  { value: 'MEMBER_GUILD_ROLE_MANAGER', label: '운영진' },
  { value: 'MEMBER_GUILD_ROLE_PLAYER', label: '일반 길드원' }
];

const PlayerItem = ({ player, onRoleChange, memberStatus, onRetire}) => {
  const [role, setRole] = useState(player.memberGuildRole);

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setRole(newRole);
    onRoleChange(player.guildId, newRole);
  };

  const renderRoleSelect = () => {
    if (memberStatus === 'retired') {
      return <span className="player-role">탈퇴한 회원</span>;
    }

    const options = memberStatus === 'waiting'
      ? [{ value: '', label: '권한 지정' }, ...roleOptions]
      : roleOptions;

    return (
        <PlayerRole
        value={memberStatus === 'waiting' && role === 'null' ? '' : role}
        onChange={handleRoleChange}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </PlayerRole>
    );
  };

  return (
    <StyledPlayerItem>
      <PlayerNickname>{player.nickname}</PlayerNickname>
      <PlayerInfo>총 이벤트 참여: {player.totalEvents || 0}</PlayerInfo>
      <PlayerInfo>최근 이벤트 참여: {player.recentEvents || 0}</PlayerInfo>
      {renderRoleSelect()}
      {memberStatus === 'active' && (
        <RetireButton onClick={() => onRetire(player.memberId, player.nickname)}>
         탈퇴
        </RetireButton>
    )}
    </StyledPlayerItem>
  );
};

export default PlayerItem;