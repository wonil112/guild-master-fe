import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../component/Button';
import Modal from '../component/Modal';
import './HomePage.css';

const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="home-container">
            <Button 
                className="center-buttion" 
                onClick={() => setIsModalOpen(true)}
            >
                Open Modal
            </Button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Modal 제목"
            >
                <p>Modal Content 작성란</p>
            </Modal>
        </div>
    );
};

export default HomePage;