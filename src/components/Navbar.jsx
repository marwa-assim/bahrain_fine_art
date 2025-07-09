import React, { useState, useContext } from "react"; 
import { ThemeContext } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ setViewMode, viewMode }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, toggleLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleView = () => {
    setViewMode(viewMode === "grid" ? "mosaic" : "grid");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-left">
          <span className="logo">🇧🇭 Bahrain Mosaic</span>
        </div>

      {/* Mobile menu button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        
      <div className={`nav-right ${isMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" className="nav-link-button" onClick={() => setIsMenuOpen(false)}>
            {t('home')}
          </Link>
          <Link to="/landmarks" className="nav-link-button" onClick={() => setIsMenuOpen(false)}>
            {t('landmarks')}
          </Link>
          <Link to="/contact" className="nav-link-button" onClick={() => setIsMenuOpen(false)}>
            {t('contact')}
          </Link>


        <div className="nav-controls">
            <button className="view-toggle-btn" onClick={toggleView}>
              {viewMode === "grid" ? "Mosaic View" : "Grid View"}
            </button>
            
            <button className="theme-toggle-btn" onClick={toggleTheme}>
              {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
            
            <button className="language-toggle-btn" onClick={toggleLanguage}>
              {language === 'en' ? 'عربي' : 'English'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
