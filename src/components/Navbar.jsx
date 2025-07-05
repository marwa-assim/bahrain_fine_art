import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ setViewMode, viewMode }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggleView = () => {
    setViewMode(viewMode === "grid" ? "mosaic" : "grid");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="logo">🇧🇭 Bahrain Mosaic</span>
      </div>
      <div className="nav-right">
        <Link to="/" className="nav-link-button">Home</Link>
        <Link to="/landmarks" className="nav-link-button">Landmarks</Link>
        <Link to="/contact" className="nav-link-button">Contact Us</Link>
        <button onClick={toggleView}>
          {viewMode === "grid" ? "Mosaic View" : "Grid View"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
