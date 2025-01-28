import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} TaskMaster. All rights reserved.</p>
      <div className="footer-links">
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <a href="#socials">Follow Us</a>
      </div>
    </footer>
  );
}

export default Footer;
