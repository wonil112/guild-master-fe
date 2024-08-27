import React, { useState } from 'react';
import styled from 'styled-components';

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 750px;
  margin: 60px auto 0; 
`;

const TabHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 10px 0;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  outline: none;
  transition: background-color 0.3s;
  border-radius: 5px 5px 0 0;

  &.active {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const TabContent = styled.div`
  flex-grow: 1;
  padding: 15px;
  background-color: rgba(223, 164, 255, 0.3);
  border-radius: 0 0 5px 5px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TabPanel = styled.div`
  padding: 10px;
  border-radius: 10px;
  color: white;
  transition: background-color 0.3s, border-color 0.3s;
`;

const Tab = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(tabs[0].label);

    return (
        <TabContainer>
            <TabHeader>
                {tabs.map((tab) => (
                    <TabButton 
                        key={tab.label} 
                        className={activeTab === tab.label ? 'active' : ''} 
                        onClick={() => setActiveTab(tab.label)}
                    >
                        {tab.label}
                    </TabButton>
                ))}
            </TabHeader>
            <TabContent>
                {tabs.map((tab) => 
                    activeTab === tab.label && (
                        <TabPanel key={tab.label}>
                            {tab.content}
                        </TabPanel>
                    )
                )}
            </TabContent>
        </TabContainer>
    );
}

export default Tab;