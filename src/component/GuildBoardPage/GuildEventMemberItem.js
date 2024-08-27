import React from 'react';
import styled from 'styled-components';

// data
const GuildEventMemberItem = ({ memberId, nickName, gameTier, selectedPosition }) => {
    return (
        <div>
            <p>닉네임: {nickName}</p>
            <p>티어: {gameTier}</p>
            <p>선택 포지션: {selectedPosition}</p>
        </div>
    );
};

export default GuildEventMemberItem;