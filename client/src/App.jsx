import React from 'react'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import './App.css'
function App() {
  return (
    <>
    < Navbar />
    < LoginPage />
    < LandingPage />
    < Footer />
    < Home />
    </>
  )
}

export default App