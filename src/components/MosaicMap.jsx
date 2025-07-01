// 1. Create a new React component to render the Mosaic Map
// File: src/components/MosaicMap.jsx

import React from "react";
import "./MosaicMap.css"; // You will define styles here



const mosaicPieces = [
  { id: 1, name: "Arad Fort", top: "5%", left: "75%" },
  { id: 2, name: "Al Fateh Mosque", top: "15%", left: "10%" },
  { id: 3, name: "Bab Al Bahrain", top: "20%", left: "45%" },
  { id: 4, name: "Tree of Life", top: "60%", left: "35%" },
  { id: 5, name: "Bahrain World Trade Center", top: "30%", left: "55%" },
  { id: 6, name: "Manama Souq", top: "25%", left: "48%" },
  { id: 7, name: "Bahrain Fort", top: "10%", left: "40%" },
  { id: 8, name: "Bahrain National Museum", top: "40%", left: "55%" },
  { id: 9, name: "Saar Temple", top: "35%", left: "20%" },
  { id: 10, name: "Al Areen Wildlife Park", top: "70%", left: "20%" },
  { id: 11, name: "Bahrain Bay", top: "30%", left: "65%" },
  { id: 12, name: "Amwaj Islands", top: "5%", left: "90%" },
];

const MosaicMap = () => {
  return (
    <div className="mosaic-container">
      <img
        src="/mosaic/mosaic_map.png"
        alt="Bahrain Mosaic Map"
        className="mosaic-background"
      />
      {mosaicPieces.map((piece) => (
        <div
          key={piece.id}
          className="mosaic-piece"
          style={{ top: piece.top, left: piece.left }}
          title={piece.name}
        >
          <span>{piece.name}</span>
        </div>
      ))}
    </div>
  );
};

export default MosaicMap;
