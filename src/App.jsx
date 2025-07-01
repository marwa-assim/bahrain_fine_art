import React, { useState, Suspense } from "react";
import { Routes, Route } from "react-router-dom"; // ✅ Remove BrowserRouter or Router from here
import Tile from "./components/Tile";
import MosaicMap from "./components/MosaicMap";
import Navbar from "./components/Navbar";
import PromptGenerator from "./components/PromptGenerator";
import { landmarks } from "./data/landmarks";
import LandmarkDetail from "./pages/LandmarkDetail"; // ✅
import ThemeToggle from "./components/ThemeToggle";
import "./App.css";
import "./styles/Popup.css";
import "./index.css";

const App = () => {
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState("home");
  const [viewMode, setViewMode] = useState("grid");

  const selectedTileGroup = selected?.group || [];

  const getBoundingBoxStyle = (group) => {
    const columns = 16;
    const tileWidth = 64;
    const tileHeight = 96;

    const sorted = [...group].sort((a, b) => a - b);
    const rows = sorted.map((id) => Math.floor((id - 1) / columns));
    const cols = sorted.map((id) => (id - 1) % columns);

    const minRow = Math.min(...rows);
    const maxRow = Math.max(...rows);
    const minCol = Math.min(...cols);
    const maxCol = Math.max(...cols);

    return {
      top: `${minRow * tileHeight}px`,
      left: `${minCol * tileWidth}px`,
      width: `${(maxCol - minCol + 1) * tileWidth}px`,
      height: `${(maxRow - minRow + 1) * tileHeight}px`,
    };
  };

  const renderPage = () => {
    switch (page) {
      case "home":
        return (
          <>
            <PromptGenerator />
            {viewMode === "grid" ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="grid-wrapper" style={{ position: "relative", display: "inline-block" }}>
                  {selected && (
                    <div
                      className="group-highlight active"
                      style={getBoundingBoxStyle(selected.group)}
                    />
                  )}
                  <div className="grid">
                    {Array.from({ length: 256 }, (_, i) => (
                      <Tile
                        key={i + 1}
                        id={i + 1}
                        onClick={(tileId) => {
                          const landmark = landmarks.find((lm) => lm.group.includes(tileId));
                          if (landmark) setSelected(landmark);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <MosaicMap />
            )}
          </>
        );
      case "landmarks":
        const LandmarksPage = React.lazy(() => import("./pages/LandmarksPage"));
        return (
          <Suspense fallback={<p>Loading landmarks...</p>}>
            <LandmarksPage />
          </Suspense>
        );
      default:
        return <p>Welcome to the Bahrain Cultural Mosaic!</p>;
    }
  };

  return (
    <div className="container">
      <Navbar setPage={setPage} setViewMode={setViewMode} viewMode={viewMode} />
      <ThemeToggle />
      <Routes>
        <Route path="/" element={renderPage()} />
        <Route path="/landmarks/:id" element={<LandmarkDetail />} />
      </Routes>

      {selected && (
        <div className="landmark-popup">
          <button className="popup-close" onClick={() => setSelected(null)}>✖</button>
          <h2>{selected.name}</h2>
          <img src={selected.image} alt={selected.name} />
          <p>{selected.descriptionShort}</p>
          <div className="popup-links">
            <a href={selected.link} target="_blank" rel="noreferrer">View on Map</a>
            <span> | </span>
            <a href={`/landmarks/${selected.id}`} target="_blank" rel="noreferrer">Read More</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
