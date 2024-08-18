import React, { useState } from 'react';
import './Tab.css';
import './GuildEventTab.css'

const Tab = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(tabs[0].label);

    return (
        <div className="tab-container">
            <div className="tab-header">
                {tabs.map((tab) => (
                    <button 
                        key={tab.label} 
                        className={`tab-button ${activeTab === tab.label ? 'active' : ''}`} 
                        onClick={() => setActiveTab(tab.label)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {tabs.map((tab) => 
                    activeTab === tab.label && (
                        <div key={tab.label} className="tab-panel">
                            {tab.content}
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default Tab;
