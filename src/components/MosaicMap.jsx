import React from "react";
import { useNavigate } from "react-router-dom";
import mosaicMap from '../assets/mosaic/mosaic_map.png';
import "./MosaicMap.css";

const mosaicPieces = [
  { id: 1, name: "Arad Fort", top: "5%", left: "75%", slug: "arad-fort" },
  { id: 2, name: "Al Fateh Mosque", top: "15%", left: "10%", slug: "al-fateh-mosque" },
  { id: 3, name: "Bab Al Bahrain", top: "20%", left: "45%", slug: "bab-al-bahrain" },
  { id: 4, name: "Tree of Life", top: "60%", left: "35%", slug: "tree-of-life" },
  { id: 5, name: "Bahrain World Trade Center", top: "30%", left: "55%", slug: "bahrain-wtc" },
  { id: 6, name: "Manama Souq", top: "25%", left: "48%", slug: "manama-souq" },
  { id: 7, name: "Bahrain Fort", top: "10%", left: "40%", slug: "bahrain-fort" },
  { id: 8, name: "Bahrain National Museum", top: "40%", left: "55%", slug: "national-museum" },
  { id: 9, name: "Saar Temple", top: "35%", left: "20%", slug: "saar-temple" },
  { id: 10, name: "Al Areen Wildlife Park", top: "70%", left: "20%", slug: "al-areen-wildlife" },
  { id: 11, name: "Bahrain Bay", top: "30%", left: "65%", slug: "bahrain-bay" },
  { id: 12, name: "Amwaj Islands", top: "5%", left: "90%", slug: "amwaj-islands" },
];

const MosaicMap = () => {
  const navigate = useNavigate();

  const handleLandmarkClick = (slug) => {
    navigate(`/landmark/${slug}`);
  };

  return (
    <div className="mosaic-container">
      <img
        src={mosaicMap}
        alt="Bahrain Mosaic Map"
        className="mosaic-background"
      />
      {mosaicPieces.map((piece) => (
        <div
          key={piece.id}
          className="mosaic-piece"
          style={{ top: piece.top, left: piece.left }}
          title={piece.name}
          onClick={() => handleLandmarkClick(piece.slug)}
        >
          <span>{piece.name}</span>
        </div>
      ))}
    </div>
  );
};

export default MosaicMap;
