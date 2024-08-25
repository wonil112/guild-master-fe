import React, { useState } from 'react';
import '../Global.css';
import GlobalHeader from './GlobalHeader';
import Modal from '../component/Modal';

const HomePage = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <GlobalHeader />
            <div className="main">
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>모다르</Modal>
                <h1>홈</h1>
            </div>
        </div>
    );
};

export default HomePage;