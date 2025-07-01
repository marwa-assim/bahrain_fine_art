import React from 'react';
import { landmarks } from "../data";

const LandmarksPage = () => {
  return (
    <div className="page">
      <h2>All Landmarks</h2>
      <div className="landmark-list">
        {landmarks.map((item) => (
          <div key={item.id} className="landmark-item">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <a href={item.reference} target="_blank">Reference</a><br />
            <a href={item.map} target="_blank">📍Directions</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandmarksPage;
