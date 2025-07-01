import React, { useState } from "react";
import Tile from "./components/Tile";
import MosaicMap from "./components/MosaicMap";
import Navbar from "./components/Navbar";
import PromptGenerator from "./components/PromptGenerator";
import { landmarks } from "./data";
import "./App.css";
import "./index.css";

const App = () => {
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState("home");
  const [viewMode, setViewMode] = useState("grid"); // NEW toggle between grid/mosaic

  const renderPage = () => {
    switch (page) {
      case "home":
        return (
          <>
            <PromptGenerator />
            {viewMode === "grid" ? (
              <div className="grid">
               {landmarks.map((landmark) => (
                 <Tile key={landmark.id} landmark={landmark} onClick={setSelected} />
               ))}
             </div>
            ) : (
             <MosaicMap />
            )}
          </>
        );
      case "landmarks":
        const LandmarksPage = React.lazy(() => import("./pages/LandmarksPage"));
        return (
          <React.Suspense fallback={<p>Loading landmarks...</p>}>
            <LandmarksPage />
          </React.Suspense>
        );
      default:
        return <p>Welcome to the Bahrain Cultural Mosaic!</p>;
    }
  };

  return (
    <div className="container">
      <Navbar setPage={setPage} setViewMode={setViewMode} viewMode={viewMode} />
      {renderPage()}
      {selected && (
        <div className="popup">
          <h2>{selected.name}</h2>
          <p>{selected.description}</p>
          <a href={selected.link} target="_blank" rel="noreferrer">
            More Info
          </a>
          <button onClick={() => setSelected(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default App;
