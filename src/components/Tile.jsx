import React, { useState } from "react";
import "./Tile.css"; // Keep your custom styles

const Tile = ({ id, onClick, isHighlighted }) => {
  const [imgSrc, setImgSrc] = useState(`${import.meta.env.BASE_URL}tiles/tile_${id}.png`);

  const handleImageError = () => {
    if (!imgSrc.includes("default.png")) {
      setImgSrc(`${import.meta.env.BASE_URL}tiles/default.png`);
    }
  };

  return (
    <div
      className={`tile ${isHighlighted ? "highlighted" : ""}`}
      onClick={() => onClick(id)}
    >
      <img
        src={imgSrc}
        alt={`Tile ${id}`}
        onError={handleImageError}
      />
      <div className="tile-label">Tile {id}</div> {/* 🆕 Hover label */}
    </div>
  );
};

export default Tile;
