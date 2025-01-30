import React, { useState } from "react";
import axios from "axios";
import "./LoginPage.css";

function LoginPage({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Send a POST request to the /login endpoint
      const response = await axios.post("http://localhost:5000/login", {
        email: email, // Match with backend (was 'username' before)
        password: password,
      });

      // Save JWT token to localStorage
      localStorage.setItem("token", response.data.access_token);

      // Optionally, redirect to another page (e.g., dashboard, tasks page)
      window.location.href = "/task"; // Replace with the actual route

      // Close the login modal
      onClose();
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
