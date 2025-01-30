import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./Navbar.css"; 
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage"; 

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false); 
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openSignUpModal = () => setIsSignUpModalOpen(true);
  const closeSignUpModal = () => setIsSignUpModalOpen(false);

  // This function will be called when user clicks on 'Sign Up' button
  const handleSignUpSubmit = () => {
    // Here, you'll handle form submission and validation
    // After successful sign-up, navigate to the TaskPage
    navigate("/Taskpage");
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">TaskManager</div>

      <ul className="menu">
        <li><Link to="/">Home</Link></li>
        <li>Features</li>
        <li>
          Made For
          <ul className="dropdown">
            <li><a href="#individuals">Individuals</a></li>
            <li><a href="#teams">Teams</a></li>
            <li><a href="#businesses">Businesses</a></li>
          </ul>
        </li>
      </ul>
      <div className="auth-buttons">
        <button className="signup" onClick={openSignUpModal}>Sign Up</button>
        <button className="login" onClick={openLoginModal}>Log In</button>
      </div>

      {/* Render Login and SignUp Modals */}
      <LoginPage isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <SignUpPage isOpen={isSignUpModalOpen} onClose={closeSignUpModal} onSubmit={handleSignUpSubmit} /> 
    </nav>
  );
}

export default Navbar;
