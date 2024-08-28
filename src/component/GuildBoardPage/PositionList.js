import React from 'react';
import styled from 'styled-components';
import PositionItem from './PositionItem';

const ListContainer = styled.div`
  padding: 20px;
  background-color: rgba(240, 240, 240, 0.6);
  border-radius: 12px;
`;

const PositionList = ({ positions }) => (
    <ListContainer>
    {Object.entries(positions)
      .filter(([_, count]) => count > 0)  // count가 0보다 큰 항목만 필터링
      .map(([name, count]) => (
        <PositionItem key={name} name={name} count={count} />
      ))}
  </ListContainer>
);

export default PositionList;