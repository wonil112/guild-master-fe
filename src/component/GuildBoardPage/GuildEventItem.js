import React from 'react';
import styled from 'styled-components';

const EventItemWrapper = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%; 
  box-sizing: border-box;

  &:hover {
    background-color: #e0e0e0;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
`;

const EventTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
  color: #333;
`;

const EventInfo = styled.p`
  font-size: 14px;
  color: #666;
  margin: 4px 0;
`;

const GuildEventItem = ({eventName, eventCurrentPopulation, eventTotalPopulation, startDate, dueDate, onClick}) => {
     
    function formatDateRange(startDate, dueDate) {
        const start = new Date(startDate);
        const due = new Date(dueDate);
    
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
    
            return `${year}.${month}.${day} ${hours}:${minutes}`;
        };
    
        return `${formatDate(start)} - ${formatDate(due)}`;
    }
    const formattedDateRange = formatDateRange(startDate, dueDate);

    return (
        <EventItemWrapper onClick={onClick}>
            <EventTitle>{eventName}</EventTitle>
            <EventInfo>일시 : {formattedDateRange} </EventInfo>
            <EventInfo>참석 : {eventCurrentPopulation} / {eventTotalPopulation}</EventInfo>
        </EventItemWrapper>
    )
};

export default GuildEventItem;