import React from 'react';
import '../Global.css';
import GlobalHeader from './GlobalHeader';
import ManagePlayerTab from '../component/ManagePage/ManagePlayerTab';
import styled from 'styled-components';


const ManagePageWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #dfa4ff62;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ManagePage = () => {
    return (
        <div>
            <GlobalHeader />
            <ManagePageWrapper>
            <div className="main">
                <h1></h1>
                <ManagePlayerTab/>
            </div>
            </ManagePageWrapper>
        </div>
    );
};

export default ManagePage;