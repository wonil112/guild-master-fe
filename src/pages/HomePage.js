import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../component/Button';
import Modal from '../component/Modal';

const HomePage = () => {
    <header className="App-header">
            <Button onClick={() => setIsModalOpen(true)}>
              Open Modal
            </Button>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Guild Name"
            >
            <p>Test</p>
            </Modal>
          </header>


};
export default HomePage;