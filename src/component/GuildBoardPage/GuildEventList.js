import React, { useState, useEffect } from 'react';
import GuildEventItem from './GuildEventItem';
import styled from 'styled-components';
import GuildEventDetailModal from'./GuildEventDetailModal'
import axios from 'axios';

const EventListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px; // 아이템 사이의 간격
  justify-content: flex-start;
`;

const GuildEventList = ({ list = [] }) => {
    //길드 이벤트 하나를 누르면 모달이 떠야 함. 
    const [selectedEventId, setSelectedEventId] = useState(null);


    //이벤트 하나에 대한 상세 내용 상태. Modal로 띄워 주어야 함. 
    const [eventDetails, setEventDetails] = useState(null);
    // 모달이 열렸는지 닫혔는지 확인함. 
    const [isModalOpen, setIsModalOpen] = useState(false);
    // selectedEventId 가 존재할 때에만 fetchEventDetails 함수를 호출함.
    // 길드를 선택해서, selectedEventId 가 바뀔 때마다 해당 Event의 상세 정보를 가져옴 
    useEffect(() => {
        if (selectedEventId) {
            fetchEventDetails(selectedEventId);
        }
    }, [selectedEventId]);
    
    // Event 하나 상세 조회 할 때 필요한 데이터. 
    const fetchEventDetails = async (eventId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/events/${eventId}`, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            // 이벤트 정보에 대한 상태? 
            setEventDetails(response.data);

            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching guild details:", error);
        }
    };


    // EventItem 을 클릭하면 eventId 에 해당하는 상세 정보모달이 가 뜸.  
    const handleEventClick = (eventId) => {
            setSelectedEventId(eventId);
            setIsModalOpen(true);
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEventId(null);
        setEventDetails(null);
    };

    if(list.length === 0 ) {
        return <div> 이벤트가 없습니다. </div>
    }

    //추후에 모달을 띄울 예정임. 
    return (
        <>
          <EventListWrapper>
            {list.map(({ eventId, eventName, eventCurrentPopulation, eventTotalPopulation, startDate, dueDate }) => (
              <GuildEventItem
                key={eventId}
                eventName={eventName}
                eventCurrentPopulation={eventCurrentPopulation}
                eventTotalPopulation={eventTotalPopulation}
                startDate={startDate}
                dueDate={dueDate}
                onClick={() => handleEventClick(eventId)}
              />
            ))}
          </EventListWrapper>
          {selectedEventId && eventDetails && (
            <GuildEventDetailModal
              eventId={selectedEventId}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              guildEventDetails={eventDetails}
              gameId={eventDetails?.gameId} 
            />
          )}
        </>
      );

};

export default GuildEventList;