import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div
      style={{
        width: '1355px',
        height: '60px',
        top: '18px',
        left: '80px',
        position: 'fixed',
        background: 'rgba(0, 0, 0, 0.6)',
        borderRadius: '20px',
        opacity: '1',
        zIndex: '1000',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly', // Ensures equal spacing
        padding: '0 20px', // Padding for some inner space
      }}
    >
      {/* Navbar Links */}
      <a
        href="/"
        style={{
          color: 'white',
          fontSize: '16px',
          padding: '10px 15px',
          fontWeight: 'bold',
          borderRadius: '8px',
          textDecoration: 'none',
          transition: 'all 0.3s',
        }}
        className="hover:bg-gray-800 hover:text-orange-400"
      >
        HOME
      </a>

      <Link
        to="/services"
        style={{
          color: "white",
          fontSize: "16px",
          padding: "10px 15px",
          borderRadius: "8px",
          textDecoration: "none",
          transition: "all 0.3s",
        }}
        className="hover:bg-gray-800 hover:text-orange-400"
      >
        SERVICES
      </Link>

      <a
        href="#company"
        style={{
          color: 'white',
          fontSize: '16px',
          padding: '10px 15px',
          borderRadius: '8px',
          textDecoration: 'none',
          transition: 'all 0.3s',
        }}
        className="hover:bg-gray-800 hover:text-orange-400"
      >
        COMPANY <span style={{ fontSize: '12px', marginLeft: '5px' }}>▼</span>
      </a>

      {/* Logo */}
      <img
        src="/public/images/2.png"
        alt="Logo"
        style={{
          width: '200px', // Small logo size
          height: '200px',
          marginTop: '55px',
        }}
      />

      <Link
        to="/dashboard"
        style={{
          color: "white",
          fontSize: "16px",
          padding: "10px 15px",
          borderRadius: "8px",
          textDecoration: "none",
          transition: "all 0.3s",
        }}
        className="hover:bg-gray-800 hover:text-orange-400"
      >
        DASHBOARD
      </Link>

      <Link
        to="/contact"
        style={{
          color: "white",
          fontSize: "16px",
          padding: "10px 15px",
          borderRadius: "8px",
          textDecoration: "none",
          transition: "all 0.3s",
        }}
        className="hover:bg-gray-800 hover:text-orange-400"
      >
        CONTACT US
      </Link>

      <Link
        to="/blog"
        style={{
          color: "white",
          fontSize: "16px",
          padding: "10px 15px",
          borderRadius: "8px",
          textDecoration: "none",
          transition: "all 0.3s",
        }}
        className="hover:bg-gray-800 hover:text-orange-400"
      >
        BLOG
      </Link>
    </div>
  );
};

export default Navbar;