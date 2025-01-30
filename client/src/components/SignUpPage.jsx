import React, { useState } from "react";
import axios from "axios";
import "./SignUpPage.css";

function SignUpPage({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/signup", {
        email: formData.email,
        password: formData.password,
      });
      console.log(response.data);
      setIsSubmitted(true);
      setError("");
    } catch (error) {
      console.error("Signup error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="signup-modal-overlay">
      <div className="signup-modal-content">
        {!isSubmitted ? (
          <>
            <button className="signup-modal-close" onClick={onClose}>
              <span role="img" aria-label="close">x</span>
            </button>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="submit" className="signup-btn">Sign Up</button>
            </form>
            {error && <p className="error-message">{error}</p>}
          </>
        ) : (
          <div className="thank-you-message">
            <h2>Thank You for Signing Up!</h2>
            <p>Your registration is successful. We'll be in touch soon!</p>
            <button className="thank-you-close" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUpPage;
