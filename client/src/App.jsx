import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import TaskPage from './components/TaskPage';
import './App.css';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assume user is logged in for now

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/task" element={<TaskPage />} />
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
