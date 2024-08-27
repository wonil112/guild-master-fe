// Get 요청해서 GuildEventMemberItem 에 뿌려주기. 
import React from 'react';
import styled from 'styled-components';
import GuildEventMemberItem from './GuildEventMemberItem';

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
            {list.length === 0 ? (
                <div className="empty-message"> 신청 길드원이 없습니다.</div>
            ) : (
                <div className="member-items">
                    {list.map(({
                        memberId,
                        gameTier,
                        selectedPosition
                    }) => (
                        < GuildEventMemberItem
                            key={memberId}
                            memberId={memberId}
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