import React from 'react';
import styled from 'styled-components';

const MemberItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const MemberInfo = styled.p`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  
`;

const GuildEventMemberItem = ({nickname, gameTier, selectedPosition }) => {
    return (
        <MemberItemContainer>
            <MemberInfo>{nickname}</MemberInfo>
            <MemberInfo>{gameTier}</MemberInfo>
            <MemberInfo>{selectedPosition}</MemberInfo>
        </MemberItemContainer>
    )   
}

export default GuildEventMemberItem;