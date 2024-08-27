import React from 'react';
import styled from 'styled-components';

const MemberItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const MemberInfo = styled.p`
  margin: 0;
`;

const GuildEventMemberItem = ({memberId, gameTier, selectedPosition }) => {
    return (
        <MemberItemContainer>
            <MemberInfo>Id: {memberId}</MemberInfo>
            <MemberInfo>티어: {gameTier}</MemberInfo>
            <MemberInfo>포지션: {selectedPosition}</MemberInfo>
        </MemberItemContainer>
    )   
}

export default GuildEventMemberItem;