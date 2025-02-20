import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Corrected hook import
import "./LandingPage.css";
// Import images
import taskTrackingImg from '../assets/images/taskTrackingImg.jpg';
import setPrioritiesImg from '../assets/images/setPrioritiesImg.jpg';
import dueDatesImg from '../assets/images/dueDatesImg.jpg';
import collaborationImg from '../assets/images/collaborationImg.jpg';
import notificationsImg from '../assets/images/notificationsImg.jpg';
import individuals from '../assets/images/individuals.jpg';
import teams from '../assets/images/teams.jpg';
import business from '../assets/images/business.jpg';
import frontimg from '../assets/images/frontimg.jpg';
import SignUpPage from './SignUpPage'; // Import your SignUpPage component

function LandingPage() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate for redirect

  const openSignUp = () => {
    setIsSignUpOpen(true);
  };

  const closeSignUp = () => {
    setIsSignUpOpen(false);
  };

  // Function to handle redirection after successful sign up
  const handleSignUpSuccess = () => {
    navigate("/taskpage"); // Redirect to TaskPage
    setIsSignUpOpen(false); // Close the SignUp modal
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Stay Organized with TaskMaster</h1>
          <p className="hero-description">
            Manage your tasks, set priorities,<br/> and achieve your goals efficiently.<br/>With TaskMaster, you can streamline your workflow,<br/> focus on what matters, and stay on top of your to-dos—whether you're working solo or with a team.
          </p>
          <button className="get-started-btn" onClick={openSignUp}>Join For Free</button>
        </div>
        <div className="hero-image">
          <img src={frontimg} alt="Business organization" />
        </div>
      </section>

      {/* SignUp Modal */}
      {isSignUpOpen && <SignUpPage isOpen={isSignUpOpen} onClose={closeSignUp} />}

      {/* Features Section */}
      <section className="features">
        <div className="feature-list">
          <div className="feature">
            <img src={taskTrackingImg} alt="Task Tracking" />
            <h3>Task Tracking</h3>
            <p>Easily create and organize tasks in one place.</p>
          </div>
          <div className="feature">
            <img src={setPrioritiesImg} alt="Set Priorities" />
            <h3>Set Priorities</h3>
            <p>Focus on what matters most with priority levels.</p>
          </div>
          <div className="feature">
            <img src={dueDatesImg} alt="Due Dates" />
            <h3>Due Dates</h3>
            <p>Never miss a deadline with clear due date reminders.</p>
          </div>
          <div className="feature">
            <img src={collaborationImg} alt="Collaboration" />
            <h3>Collaboration</h3>
            <p>Work together with teammates on shared tasks.</p>
          </div>
          <div className="feature">
            <img src={notificationsImg} alt="Notifications" />
            <h3>Notifications</h3>
            <p>Stay updated with real-time task reminders and alerts.</p>
          </div>
        </div>
      </section>

      <section id="individuals" className="individuals-section">
        <div className="individuals-container">
          {/* Text Content */}
          <div className="text-content">
            <h2>Task Manager for Individuals</h2>
            <p>
              Manage your tasks effortlessly! Whether It's work or personal projects,
              our task manager helps you stay organized and on top of your goals.
            </p>
            {/* <button className="learn-more-btn">Get Started</button> */}
          </div>
          {/* Image Content */}
          <div className="image-content">
            <img
              src={individuals}
              alt="Task Manager for Individuals"
            />
          </div>
        </div>
      </section>

      <section id="teams" className="teams-section">
        <div className="teams-container">
          <div className="image-content">
            <img
              src={teams}
              alt="Task Manager for Teams"
            />
          </div>

          {/* Text Content */}
          <div className="text-content">
            <h2>Task Manager for Teams</h2>
            <p>
              Collaborate with your team effortlessly! Keep everyone aligned, track
              progress, and ensure seamless communication with our task management tool.
            </p>
            {/* <button className="learn-more-btn">Get Started</button> */}
          </div>
        </div>
      </section>

      <section id="businesses" className="businesses-section">
        <div className="businesses-container">
          {/* Text Content */}
          <div className="text-content">
            <h2>Task Manager for Businesses</h2>
            <p>
              For businesses of all sizes, streamline your workflow, manage multiple
              projects, and monitor productivity to help your company succeed.
            </p>
            {/* <button className="learn-more-btn">Get Started</button> */}
          </div>

          {/* Image Content */}
          <div className="image-content">
            <img
              src={business}
              alt="Task Manager for Businesses"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
