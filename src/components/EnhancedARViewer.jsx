import React, { useState, useEffect, useRef } from 'react';
import './EnhancedARViewer.css';

const EnhancedARViewer = ({ landmark }) => {
  const [currentView, setCurrentView] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  // Virtual tour data structure
  const virtualTourData = {
    overview: {
      title: 'Overview',
      images: Array.isArray(landmark.gallery) ? landmark.gallery : [],
      hotspots: [
        { x: 30, y: 70, label: 'Interior View', target: 'interior' },
        { x: 70, y: 30, label: 'Aerial View', target: 'aerial' }
      ]
    },
    interior: {
      title: 'Interior Experience',
      images: Array.isArray(landmark.gallery) ? landmark.gallery.slice(0, 4) : [],
      hotspots: [
        { x: 20, y: 80, label: 'Back to Overview', target: 'overview' },
        { x: 80, y: 20, label: 'Ground Level', target: 'ground' }
      ]
    },
    aerial: {
      title: 'Aerial Perspective',
      images: Array.isArray(landmark.gallery) ? landmark.gallery.slice(4, 8) : [],
      hotspots: [
        { x: 50, y: 90, label: 'Back to Overview', target: 'overview' },
        { x: 10, y: 10, label: 'Ground Level', target: 'ground' }
      ]
    },
    ground: {
      title: 'Ground Level',
      images: Array.isArray(landmark.gallery) ? landmark.gallery : [],
      hotspots: [
        { x: 50, y: 10, label: 'Back to Overview', target: 'overview' },
        { x: 90, y: 50, label: 'Interior View', target: 'interior' }
      ]
    }
  };

  const currentTourData = virtualTourData[currentView] || virtualTourData.overview;
  const currentImage = currentTourData.images[currentImageIndex] || landmark.image;

  // Mouse/Touch handlers for zoom and pan
  const handleMouseDown = (e) => {
    if (isZoomed) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - panPosition.x,
        y: e.clientY - panPosition.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && isZoomed) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(1, Math.min(3, zoomLevel + delta));
    setZoomLevel(newZoom);
    
    if (newZoom === 1) {
      setIsZoomed(false);
      setPanPosition({ x: 0, y: 0 });
    } else {
      setIsZoomed(true);
    }
  };

  const handleHotspotClick = (target) => {
    setCurrentView(target);
    setCurrentImageIndex(0);
    setZoomLevel(1);
    setIsZoomed(false);
    setPanPosition({ x: 0, y: 0 });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      (prev + 1) % currentTourData.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? currentTourData.images.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragStart, panPosition]);


  if (currentTourData.images.length === 0) {
  return (
    <div className="enhanced-ar-viewer">
      <p style={{ padding: '1rem', textAlign: 'center', color: '#777' }}>
        🚫 No AR images available for this landmark.
      </p>
    </div>
  );
}


  return (
    <div className="enhanced-ar-viewer">

      
      <div className="ar-header">
        <h3>🎯 Virtual Tour: {landmark.name}</h3>
        <div className="view-selector">
          {Object.keys(virtualTourData).map((view) => (
            <button
              key={view}
              className={`view-btn ${currentView === view ? 'active' : ''}`}
              onClick={() => handleHotspotClick(view)}
            >
              {virtualTourData[view].title}
            </button>
          ))}
        </div>
      </div>

      <div className="ar-main-container">
        <div 
          className="ar-image-container"
          onMouseDown={handleMouseDown}
          onWheel={handleWheel}
          style={{ cursor: isZoomed ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
        >
          <img
            ref={imageRef}
            src={currentImage}
            alt={`${landmark.name} - ${currentTourData.title}`}
            className="ar-main-image"
            style={{
              transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease'
            }}
            draggable={false}
          />

          {/* Navigation Hotspots */}
          {!isZoomed && currentTourData.hotspots.map((hotspot, index) => (
            <div
              key={index}
              className="ar-hotspot"
              style={{
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`
              }}
              onClick={() => handleHotspotClick(hotspot.target)}
            >
              <div className="hotspot-pulse"></div>
              <div className="hotspot-label">{hotspot.label}</div>
            </div>
          ))}

          {/* Image Navigation */}
          {currentTourData.images.length > 1 && (
            <>
              <button className="ar-nav-btn prev" onClick={prevImage}>
                ‹
              </button>
              <button className="ar-nav-btn next" onClick={nextImage}>
                ›
              </button>
            </>
          )}
        </div>

        {/* Controls Panel */}
        <div className="ar-controls">
          <div className="zoom-controls">
            <button 
              onClick={() => {
                setZoomLevel(1);
                setIsZoomed(false);
                setPanPosition({ x: 0, y: 0 });
              }}
              className="control-btn"
            >
              🔍 Reset Zoom
            </button>
            <span className="zoom-level">Zoom: {Math.round(zoomLevel * 100)}%</span>
          </div>

          <div className="image-counter">
            {currentImageIndex + 1} / {currentTourData.images.length}
          </div>

          <div className="tour-info">
            <h4>{currentTourData.title}</h4>
            <p>Use mouse wheel to zoom, drag to pan when zoomed</p>
            <p>Click blue hotspots to navigate between views</p>
          </div>
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="ar-thumbnails">
        {currentTourData.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default EnhancedARViewer;

