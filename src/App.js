import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GuildListPage from './pages/GuildListPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import './App.css';
import Button from './component/Button.js';
import Modal from './component/Modal.js';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/guildlist" element={<GuildListPage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;