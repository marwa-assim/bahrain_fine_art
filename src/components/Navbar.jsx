import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import "./Navbar.css";

const Navbar = ({ setPage, setViewMode, viewMode }) => {
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
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("landmarks")}>Landmarks</button>
        <button onClick={() => setPage("contact")}>Contact Us</button>
        <button onClick={toggleTheme}>🌙 Toggle Theme</button>
        <button onClick={toggleView}>
          {viewMode === "grid" ? "Mosaic View" : "Grid View"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
