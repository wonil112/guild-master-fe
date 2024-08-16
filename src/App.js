import React, { useState } from 'react';
import './App.css';
import Button from './component/Button.js';
import Modal from './component/Modal.js';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={() => setIsModalOpen(true)}>
          Open Modal
        </Button>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Guild Name"
        >
          <p>dkaasdl</p>
        </Modal>
      </header>
    </div>
  );
}

export default App;