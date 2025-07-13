import React, { Suspense, useState, useEffect, useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext"; 
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom"; // ✅ Remove BrowserRouter or Router from here
import { Link } from 'react-router-dom';
import Tile from "./components/Tile";
import MosaicMap from "./components/MosaicMap";
import HeroBanner from "./components/HeroBanner"; // Already done ✅
import FeatureBoxes from "./components/FeatureBoxes";
import ContactPage from "./pages/ContactPage";
import Navbar from "./components/Navbar";
import PromptGenerator from "./components/PromptGenerator";
import { landmarks } from "./data/landmarks";
import LandmarkDetail from "./pages/LandmarkDetail"; // ✅
import ThemeToggle from "./components/ThemeToggle";
import "./App.css";
import "./styles/Popup.css";
import "./index.css";

const LandmarksPage = React.lazy(() => import("./pages/LandmarksPage"));



const HomePage = ({ viewMode, setViewMode, selected, setSelected, getBoundingBoxStyle }) => (
  <>
    <HeroBanner />
    <PromptGenerator />
    {viewMode === "grid" ? (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="grid-wrapper">
          {selected && (
            <div
              className="group-highlight active"
              style={getBoundingBoxStyle(selected.group)}
            />
          )}
          <div className="grid-container">
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
      </div>
    ) : (
      <MosaicMap />
    )}
    <FeatureBoxes />
  </>
);





const App = () => {
  const { theme } = useContext(ThemeContext);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState("home");
  const [viewMode, setViewMode] = useState("grid");
  const [galleryMap, setGalleryMap] = useState({});



  const location = useLocation();

  useEffect(() => {
    fetch('/bahrain_fine_art/galleryIndex.json')
      .then(res => res.json())
      .then(data => setGalleryMap(data))
      .catch(err => console.error('Gallery index load error:', err));
  }, []);

useEffect(() => {
  // Close popup when navigating to a different page
  if (location.pathname !== "/") {
    setSelected(null);
  }
}, [location.pathname]);



  const selectedTileGroup = selected?.group || [];

  function getLandmarkPreviewImage(landmark) {
  // Look for the key that starts with the ID followed by underscore
  const matchKey = Object.keys(galleryMap).find(key => key.startsWith(`${landmark.id}_`));

  if (matchKey && galleryMap[matchKey]?.length > 0) {
    const firstImage = galleryMap[matchKey][0];
    return `${import.meta.env.BASE_URL}gallery/${matchKey}/${firstImage}`;
  }

  return ''; // fallback image if nothing found
}




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
                <div className="grid-wrapper">
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
    <div className={`container ${theme}`}>
      <Navbar setPage={setPage} setViewMode={setViewMode} viewMode={viewMode} />
      <ThemeToggle />
      <Routes>
  <Route path="/" element={
    <HomePage
      viewMode={viewMode}
      setViewMode={setViewMode}
      selected={selected}
      setSelected={setSelected}
      getBoundingBoxStyle={getBoundingBoxStyle}
    />
  } />
  <Route path="/landmarks" element={
    <Suspense fallback={<p>Loading landmarks...</p>}>
      <LandmarksPage />
    </Suspense>
  } />
  <Route path="/contact" element={<ContactPage />} />

  <Route path="/landmarks/:id" element={<LandmarkDetail />} />
</Routes>


      {selected && location.pathname === "/" && (
        <div className="landmark-popup">
          <button className="popup-close" onClick={() => setSelected(null)}>✖</button>
          <h2>{selected.name}</h2>
          <img src={getLandmarkPreviewImage(selected)} alt={selected.name} />
          <p>{selected.descriptionShort}</p>
          <div className="popup-links">
            <a href={selected.link} target="_blank" rel="noreferrer">View on Map</a>
            <span> | </span>
            <Link to={`/landmarks/${selected.id}`}>Read More</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
