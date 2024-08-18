import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GuildListPage from './pages/GuildListPage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import HomePage from './pages/HomePage';
import GuildBoardPage from './pages/GuildBoardPage'
import './App.css';

function App() {
  
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/guildboard/:id" element={<GuildBoardPage />} /> 
          <Route path="/guildlist" element={<GuildListPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;