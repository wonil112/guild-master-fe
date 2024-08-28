import React from 'react';
import styled from 'styled-components';
import MyEventItem from './MyEventItem';

const EventListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  border-radius: 10px;

  .empty-message {
    text-align: center;
    color: #666;
    padding: 20px 0;
  }

  .event-items {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;

const MyEventList = ({ list = [] }) => {
    return (
        <EventListContainer>
            {list.length === 0 ? (
                <div className="empty-message">신청 이벤트가 없습니다.</div>
            ) : (
                <div className="event-items">
                    {list.map(({
                        eventId,
                        gameId,
                        eventName,
                        eventCurrentPopulation,
                        eventTotalPopulation,
                        startDate,
                        dueDate,
                    }) => (
                        <MyEventItem
                            key={eventId}
                            gameId={gameId}
                            eventName={eventName}
                            eventCurrentPopulation={eventCurrentPopulation}
                            eventTotalPopulation={eventTotalPopulation}
                            startDate={startDate}
                            dueDate={dueDate}
                        />
                    ))}
                </div>
            )}
        </EventListContainer>
    );
};

export default MyEventList;