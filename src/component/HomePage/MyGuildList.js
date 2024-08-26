import React from 'react';
import styled from 'styled-components';
import MyGuildItem from './MyGuildItem';

const GuildListContainer = styled.div`
  width: 100%;
  max-height: 600px;
  border-radius: 8px;
  overflow-y: auto;

   .empty-message {
    text-align: center;
    color: #666;
    padding: 20px 0;
  }

  .guild-items {
    text-align: flex;
    flex-direction: column;
    padding: 30px 0;
  }
`;



function MyGuildList({list = []}) {
    return (
        <GuildListContainer>
            {list.length === 0 ? (
                <div className="empty-message">신청 길드가 없습니다.</div>
            ) : (
                <div className="guild-items">
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
                </div>
            )}
        </GuildListContainer>
    );
}

export default MyGuildList;