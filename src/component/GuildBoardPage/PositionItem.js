import React from 'react';
import styled from 'styled-components';

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  margin-bottom: 10px;
`;

const PositionName = styled.span`
  font-weight: bold;
`;

const PositionCount = styled.span`
  background-color: #4CAF50;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
`;

const PositionItem = ({ name, count }) => (
  <ItemContainer>
    <PositionName>{name}</PositionName>
    <PositionCount>{count}</PositionCount>
  </ItemContainer>
);

export default PositionItem;