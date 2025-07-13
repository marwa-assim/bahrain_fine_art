// src/pages/LandmarkDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { landmarks } from "../data/landmarks";
import Gallery from "../components/EnhancedGallery";
import GalleryTab from "../components/GalleryTab";
import ARViewer from "../components/EnhancedARViewer";
import AIGenerator from "../components/EnhancedAIGenerator";
import { Link } from "react-router-dom";



const LandmarkDetail = () => {
  const { id } = useParams();
  const landmark = landmarks.find(l => l.id === parseInt(id));
  const [jsonData, setJsonData] = useState(null);
const [landmarkKey, setLandmarkKey] = useState(null);

  const [activeTab, setActiveTab] = React.useState("description");
  const [htmlContent, setHtmlContent] = useState("");

    useEffect(() => {
    if (activeTab === "description") {
        fetch(`${import.meta.env.BASE_URL}descriptions/${id}.html`)
        .then((res) => res.text())
        .then((data) => setHtmlContent(data))
        .catch(() => setHtmlContent("<p>Full description is currently unavailable.</p>"));
    }
  }, [id, activeTab]);

  useEffect(() => {
  const fetchGalleryData = async () => {
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}complete_gallery_types.json`);
      const data = await res.json();
      setJsonData(data);

      // Find the key that matches the landmark ID
      const match = Object.keys(data).find(key => key.startsWith(`${landmark.id}_`));
      setLandmarkKey(match || null);
    } catch (error) {
      console.error('Failed to load gallery data:', error);
    }
  };

  if (landmark?.id) {
    fetchGalleryData();
  }
}, [landmark]);


  if (!landmark) return <p>Landmark not found.</p>;

  return (
    <div className="landmark-detail">
      <h1>{landmark.name}</h1>
      <div className="tabs">
        <button onClick={() => setActiveTab("description")} className={activeTab === "description" ? "active" : ""}>Description</button>
        <button onClick={() => setActiveTab("gallery")} className={activeTab === "gallery" ? "active" : ""}>Gallery</button>
        <button onClick={() => setActiveTab("map")} className={activeTab === "map" ? "active" : ""}>Map</button>
        <button onClick={() => setActiveTab("ai")} className={activeTab === "ai" ? "active" : ""}>AI</button>
        <button onClick={() => setActiveTab("ar")} className={activeTab === "ar" ? "active" : ""}>AR</button>
      </div>

      <div className="tab-content">
        {activeTab === "description" && (
         <div className="landmark-description">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
         </div> 
        )}

    
      {activeTab === "gallery" && landmarkKey && <Gallery landmarkId={landmarkKey} />}





        {activeTab === "map" && (
          landmark.mapEmbedUrl ? (
          <iframe
            src={landmark.mapEmbedUrl}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Map"
          ></iframe>
         ) : (
          <p>No map available.</p>
        )
       )}

        {activeTab === "ai" && <AIGenerator landmark={landmark} />}

        {activeTab === "ar" && landmarkKey && <ARViewer landmarkId={landmarkKey} />}




      </div>
    </div>
  );
};

export default LandmarkDetail;
