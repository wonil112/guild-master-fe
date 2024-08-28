// Get 요청해서 GuildEventMemberItem 에 뿌려주기. 
import React from 'react';
import styled from 'styled-components';
import GuildEventMemberItem from './GuildEventMemberItem';

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  border-bottom: 2px solid #ddd;
  margin-bottom: 10px;
`;

const HeaderItem = styled.p`
  margin: 0;
  font-weight: bold;
  text-align: center;
  color: #333;
`;

const EventListContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;

  .empty-message {
    text-align: center;
    color: #666;
    padding: 20px 0;
  }

  .member-items {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;
// event/{event-id}/members를 내려주어야 함. 
const GuildEventMemberList = ({list = []}) => {
    return (
        <EventListContainer>
            <TableHeader>
                <HeaderItem>닉네임</HeaderItem>
                <HeaderItem>티어</HeaderItem>
                <HeaderItem>포지션</HeaderItem>
            </TableHeader>
            {list.length === 0 ? (
                <div className="empty-message"> 신청 길드원이 없습니다.</div>
            ) : (
                <div className="member-items">
                    {list.map(({
                        memberId,
                        nickname,
                        gameTier,
                        selectedPosition
                    }) => (
                        < GuildEventMemberItem
                            key={memberId}
                            nickname={nickname}
                            gameTier={gameTier}
                            selectedPosition={selectedPosition}
                        />
                    ))}
                </div>
            )}
        </EventListContainer>
    )
}

export default GuildEventMemberList;