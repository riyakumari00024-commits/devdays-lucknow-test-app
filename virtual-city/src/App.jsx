import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './pages/Hero';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Emergency from './pages/Emergency';
import Transport from './pages/Transport';
import Environment from './pages/Environment';
import Services from './pages/Services';
import CityAI from './components/CityAI';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
        <Navigation 
          isDarkMode={isDarkMode} 
          onToggleDarkMode={toggleDarkMode}
          unreadNotifications={unreadNotifications}
        />
        <Routes>
          <Route path="/" element={<Hero isDarkMode={isDarkMode} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/environment" element={<Environment />} />
          <Route path="/services" element={<Services />} />
        </Routes>
        <CityAI />
      </div>
    </Router>
  );
}

export default App;
