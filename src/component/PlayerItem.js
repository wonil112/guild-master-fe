import React, { useState } from 'react';
import './PlayerItem.css';

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
      <select 
        className="player-role" 
        value={memberStatus === 'waiting' && role === 'null' ? '' : role} 
        onChange={handleRoleChange}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="player-item">
      <span className="player-nickname">{player.nickname}</span>
      <span className="player-total-events">총 이벤트 참여: {player.totalEvents || 0}</span>
      <span className="player-recent-events">최근 이벤트 참여: {player.recentEvents || 0}</span>
      {renderRoleSelect()}
      {memberStatus === 'active' && (
        <button className="retire-button" onClick={() => onRetire(player.memberId, player.nickname)}>
          탈퇴
        </button>
              )}
    </div>
  );
};

export default PlayerItem;