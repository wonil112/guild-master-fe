import React from 'react';
import styled from 'styled-components';
import MyGuildItem from './MyGuildItem';

const GuildListContainer = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const GuildListTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const GuildItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #666;
  padding: 20px;
`;

function MyGuildList({list = []}) {
    return (
        <GuildListContainer>
            <GuildListTitle>내 길드 목록</GuildListTitle>
            {list.length === 0 ? (
                <EmptyMessage>내 길드가 없습니다.</EmptyMessage>
            ) : (
                <GuildItemsWrapper>
                    {list.map(({
                        guildId,
                        gameId,
                        guildName,
                        guildCurrentPopulation,
                        guildTotalPopulation,
                        memberGuildRoles,
                        memberGuildStatuses
                    }) => (
                        <MyGuildItem
                            key={guildId}
                            guildId={guildId}
                            gameId={gameId}
                            guildName={guildName}
                            guildCurrentPopulation={guildCurrentPopulation}
                            guildTotalPopulation={guildTotalPopulation}
                            memberGuildRoles={memberGuildRoles}
                            memberGuildStatuses={memberGuildStatuses}
                        />
                    ))}
                </GuildItemsWrapper>
            )}
        </GuildListContainer>
    );
}

export default MyGuildList;