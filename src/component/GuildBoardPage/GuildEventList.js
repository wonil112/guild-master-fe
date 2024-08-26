import React, { useState } from 'react';
import GuildEventItem from './GuildEventItem';
import styled from 'styled-components';


const EventListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px; // 아이템 사이의 간격
  justify-content: flex-start;
`;

const GuildEventList = ({ list = [] }) => {
    //길드 이벤트 하나를 누르면 모달이 떠야 함. 
    const [selectedEventId, setSelectedEventId] = useState(null);

    // EventItem 을 클릭하면 eventId 에 해당하는 상세 정보모달이 가 뜸.  
    const handleEventClick = (eventId) => {
            setSelectedEventId(eventId);
    }

    if(list.length === 0 ) {
        return <div> 이벤트가 없습니다. </div>
    }

    //추후에 모달을 띄울 예정임. 
    return (
        <EventListWrapper>
            {list.map(({ eventId, eventName, eventCurrentPopulation, eventTotalPopulation, startDate, dueDate }) => (
                <GuildEventItem
                    key={eventId}
                    eventId={eventId}
                    eventName={eventName}
                    eventCurrentPopulation={eventCurrentPopulation}
                    eventTotalPopulation={eventTotalPopulation}
                    startDate={startDate}
                    dueDate={dueDate}
                    // onClick={() => onEventClick(eventId)}
                />
            ))}
        </EventListWrapper>
    )

};

export default GuildEventList;