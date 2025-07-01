import React, { useState } from "react";
import { landmarks } from "../data";
import "./LandmarksPage.css";

const LandmarksPage = () => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <div className="landmarks-page">
      <div className="language-toggle">
        <button onClick={toggleLanguage}>
          {language === "en" ? "🇸🇦 عرض بالعربية" : "🇬🇧 Show in English"}
        </button>
      </div>

      <h1>{language === "en" ? "Explore Bahrain's Landmarks" : "استكشف معالم البحرين"}</h1>

      <div className="landmarks-grid">
        {landmarks.map((landmark) => (
          <div className="landmark-card" key={landmark.id}>
            <img src={landmark.image} alt={landmark.name.en} className="landmark-image" />

            <h2>{language === "en" ? landmark.name.en : landmark.name.ar}</h2>
            <p>{language === "en" ? landmark.description.en : landmark.description.ar}</p>

            <div className="landmark-actions">
              <a href={landmark.link} target="_blank" rel="noreferrer">
                {language === "en" ? "Read More" : "اقرأ المزيد"}
              </a>

              <a href={landmark.map} target="_blank" rel="noreferrer">
                {language === "en" ? "📍 Directions" : "📍 الاتجاهات"}
              </a>

              <button disabled title="Coming Soon">
                🤖 AI Photos
              </button>

              <button disabled title="Coming Soon">
                🕶️ AR View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandmarksPage;
