import React, { useState, useEffect, useRef } from 'react';
import './ARViewer.css';

const ARViewer = ({ landmarkId = "2_Bahrain_Fort", galleryTypesPath = "/complete_gallery_types.json" }) => {
  const [galleryData, setGalleryData] = useState(null);
  const [locations, setLocations] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [currentLocationId, setCurrentLocationId] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [visitedLocations, setVisitedLocations] = useState(new Set());
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  
  // Fixed smooth horizontal 3D rotation - primarily Y-axis like a real 3D body
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  
  const [viewMode, setViewMode] = useState('navigation');
  const [isAR3DMode, setIsAR3DMode] = useState(false);
  
  const imageRef = useRef(null);

  // Load gallery data from JSON
  useEffect(() => {
    const loadGalleryData = async () => {
      try {
        const response = await fetch(galleryTypesPath);
        const data = await response.json();
        
        // Find landmark data by ID
        const landmark = data[landmarkId];
        if (!landmark) {
          console.error(`Landmark ${landmarkId} not found in gallery data`);
          setIsLoading(false);
          return;
        }
        
        setGalleryData(landmark);
        
        // Convert JSON structure to locations array (same format as FixedVirtualTour)
        const locationTypes = landmark.sequentialOrder || ['aerial', 'exterior', 'interior', 'details'];
        const convertedLocations = [];
        
        locationTypes.forEach((type, index) => {
          if (landmark.images[type] && landmark.images[type].length > 0) {
            const location = {
              id: type,
              name: type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1'),
              type: type,
              images: landmark.images[type].map(img => img.src),
              description: landmark.images[type][0].description || `${type} view of ${landmark.name}`,
              nextLocation: locationTypes[index + 1] || locationTypes[0],
              navigationPoints: landmark.navigationPoints[type] || []
            };
            convertedLocations.push(location);
          }
        });
        
        setLocations(convertedLocations);
        
        // Create all images array for carousel mode (same format as FixedVirtualTour)
        const allImagesArray = convertedLocations.flatMap((location, locationIndex) => 
          location.images.map((image, imageIndex) => ({
            src: image,
            locationId: location.id,
            locationName: location.name,
            locationType: location.type,
            description: location.description,
            globalIndex: locationIndex * 10 + imageIndex,
            localIndex: imageIndex,
            totalInLocation: location.images.length
          }))
        );
        
        setAllImages(allImagesArray);
        
        // Set initial location
        if (convertedLocations.length > 0) {
          const firstLocation = convertedLocations[0].id;
          setCurrentLocationId(firstLocation);
          setVisitedLocations(new Set([firstLocation]));
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading gallery data:', error);
        setIsLoading(false);
      }
    };

    loadGalleryData();
  }, [landmarkId, galleryTypesPath]);

  const currentLocation = locations.find(loc => loc.id === currentLocationId);
  const currentImage = viewMode === 'carousel' 
    ? allImages[carouselIndex]?.src 
    : currentLocation?.images[currentImageIndex];
  const progress = locations.length > 0 ? Math.round((visitedLocations.size / locations.length) * 100) : 0;

  // Navigate to specific location
  const navigateToLocation = (locationId) => {
    setCurrentLocationId(locationId);
    setCurrentImageIndex(0);
    setVisitedLocations(prev => new Set([...prev, locationId]));
    resetView();
  };

  // Sequential navigation
  const navigateToNextLocation = () => {
    if (!currentLocation) return;
    const nextLocationId = currentLocation.nextLocation;
    if (nextLocationId) {
      navigateToLocation(nextLocationId);
    }
  };

  // Navigate images within current location
  const navigateImage = (direction) => {
    if (!currentLocation) return;
    const maxIndex = currentLocation.images.length - 1;
    if (direction === 'next') {
      setCurrentImageIndex(prev => prev < maxIndex ? prev + 1 : 0);
    } else {
      setCurrentImageIndex(prev => prev > 0 ? prev - 1 : maxIndex);
    }
    resetView();
  };

  // Navigate all images (carousel mode)
  const navigateCarousel = (direction) => {
    const maxIndex = allImages.length - 1;
    if (direction === 'next') {
      setCarouselIndex(prev => prev < maxIndex ? prev + 1 : 0);
    } else {
      setCarouselIndex(prev => prev > 0 ? prev - 1 : maxIndex);
    }
    resetView();
  };

  const handleZoom = (delta, centerX = null, centerY = null) => {
    const newZoom = Math.max(0.5, Math.min(5, zoom + delta));
    
    if (centerX !== null && centerY !== null && imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = centerX - rect.left - rect.width / 2;
      const y = centerY - rect.top - rect.height / 2;
      
      setPan({
        x: pan.x - (x * delta / zoom),
        y: pan.y - (y * delta / zoom)
      });
    }
    
    setZoom(newZoom);
  };

  const handleImageClick = (e) => {
    if (e.detail === 2) { // Double click
      const rect = e.target.getBoundingClientRect();
      const centerX = e.clientX;
      const centerY = e.clientY;
      
      if (zoom > 1) {
        resetView();
      } else {
        handleZoom(1, centerX, centerY);
      }
    }
  };

  const handleMouseDown = (e) => {
    if (isAR3DMode) {
      setIsRotating(true);
      setLastMousePos({ x: e.clientX, y: e.clientY });
    } else {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isRotating && isAR3DMode) {
      // Smooth horizontal rotation like a real 3D body spinning around its vertical axis
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;
      
      setRotation(prev => ({
        // Primary Y-axis rotation (horizontal movement = horizontal spinning)
        y: prev.y + (deltaX * 0.8), // Smooth horizontal rotation
        // Subtle X-axis tilt (vertical movement = slight tilt, limited)
        x: Math.max(-30, Math.min(30, prev.x + (deltaY * 0.3))), // Limited tilt
        // Keep Z-axis stable
        z: prev.z
      }));
      
      setLastMousePos({ x: e.clientX, y: e.clientY });
    } else if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsRotating(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    handleZoom(delta);
  };

  // Enhanced touch events for smooth 3D rotation
  const handleTouchStart = (e) => {
    if (isAR3DMode && e.touches.length === 1) {
      setIsRotating(true);
      setLastMousePos({ 
        x: e.touches[0].clientX, 
        y: e.touches[0].clientY 
      });
    }
  };

  const handleTouchMove = (e) => {
    if (isRotating && isAR3DMode && e.touches.length === 1) {
      e.preventDefault();
      const deltaX = e.touches[0].clientX - lastMousePos.x;
      const deltaY = e.touches[0].clientY - lastMousePos.y;
      
      setRotation(prev => ({
        // Smooth horizontal rotation for touch
        y: prev.y + (deltaX * 0.8),
        // Limited vertical tilt
        x: Math.max(-30, Math.min(30, prev.x + (deltaY * 0.3))),
        z: prev.z
      }));
      
      setLastMousePos({ 
        x: e.touches[0].clientX, 
        y: e.touches[0].clientY 
      });
    }
  };

  const handleTouchEnd = () => {
    setIsRotating(false);
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setRotation({ x: 0, y: 0, z: 0 });
  };

  const toggleAR3DMode = () => {
    setIsAR3DMode(!isAR3DMode);
    resetView();
  };

  // Update carousel index when switching to carousel mode
  useEffect(() => {
    if (viewMode === 'carousel' && currentLocation) {
      const currentGlobalIndex = allImages.findIndex(img => 
        img.locationId === currentLocationId && img.localIndex === currentImageIndex
      );
      if (currentGlobalIndex !== -1) {
        setCarouselIndex(currentGlobalIndex);
      }
    }
  }, [viewMode, currentLocationId, currentImageIndex, allImages]);

  if (isLoading) {
    return (
      <div className="fixed-virtual-tour">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading AR Experience...</div>
        </div>
      </div>
    );
  }

  if (!galleryData || !currentLocation) {
    return (
      <div className="fixed-virtual-tour">
        <div className="error-container">
          <div className="error-text">Gallery data not found for landmark: {landmarkId}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed-virtual-tour">
      {/* Header */}
      <div className="tour-header">
        <div className="header-left">
          <h2>🏛️ Virtual Tour: {viewMode === 'carousel' ? allImages[carouselIndex]?.locationName : currentLocation.name}</h2>
          <div className="image-counter">
            {viewMode === 'carousel' 
              ? `Image ${carouselIndex + 1} of ${allImages.length} (All Locations)`
              : `Image ${currentImageIndex + 1} of ${currentLocation.images.length} (${currentLocation.name})`
            }
          </div>
        </div>
        <div className="header-right">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            <span className="progress-text">{progress}% Complete</span>
          </div>
        </div>
      </div>

      {/* View Mode Controls */}
      <div className="view-mode-controls">
        <button 
          className={`mode-btn ${viewMode === 'navigation' ? 'active' : ''}`}
          onClick={() => setViewMode('navigation')}
        >
          🗺️ Navigation Mode
        </button>
        <button 
          className={`mode-btn ${viewMode === 'carousel' ? 'active' : ''}`}
          onClick={() => setViewMode('carousel')}
        >
          🎠 Carousel Mode (All Images)
        </button>
        <button 
          className={`mode-btn ${isAR3DMode ? 'active' : ''}`}
          onClick={toggleAR3DMode}
        >
          🥽 AR 3D Mode
        </button>
      </div>

      {/* Main Image Display */}
      <div className={`image-container ${isAR3DMode ? 'ar-3d-mode' : ''}`}
           onMouseDown={handleMouseDown}
           onMouseMove={handleMouseMove}
           onMouseUp={handleMouseUp}
           onMouseLeave={handleMouseUp}
           onTouchStart={handleTouchStart}
           onTouchMove={handleTouchMove}
           onTouchEnd={handleTouchEnd}
           onWheel={handleWheel}>
        
        <img 
          ref={imageRef}
          src={currentImage}
          alt={viewMode === 'carousel' 
            ? `${allImages[carouselIndex]?.locationName} - ${allImages[carouselIndex]?.locationType}`
            : `${currentLocation.name} - View ${currentImageIndex + 1}`
          }
          className="tour-image"
          style={{
            transform: `
              scale(${zoom}) 
              translate(${pan.x / zoom}px, ${pan.y / zoom}px) 
              rotateX(${rotation.x}deg) 
              rotateY(${rotation.y}deg) 
              rotateZ(${rotation.z}deg)
            `,
            cursor: isAR3DMode ? (isRotating ? 'grabbing' : 'grab') : (isDragging ? 'grabbing' : 'grab'),
            filter: isAR3DMode ? 'contrast(1.2) saturate(1.3) brightness(1.1)' : 'none',
            transformStyle: 'preserve-3d',
            transition: isRotating ? 'none' : 'transform 0.3s ease'
          }}
          onClick={handleImageClick}
          draggable={false}
        />
        
        {/* AR 3D Effects Overlay */}
        {isAR3DMode && (
          <div className="ar-overlay">
            <div className="ar-grid"></div>
            <div className="ar-scanner"></div>
            <div className="ar-corners">
              <div className="corner top-left"></div>
              <div className="corner top-right"></div>
              <div className="corner bottom-left"></div>
              <div className="corner bottom-right"></div>
            </div>
            <div className="ar-info">
              <div className="ar-text">Smooth 3D Body Rotation: Drag horizontally to spin</div>
              <div className="ar-angles">
                Rotation: {Math.round(rotation.y)}° | Tilt: {Math.round(rotation.x)}°
              </div>
            </div>
          </div>
        )}
        
        {/* Distributed Navigation Points (only in navigation mode) */}
        {viewMode === 'navigation' && !isAR3DMode && currentLocation.navigationPoints && (
          <div className="navigation-points">
            {currentLocation.navigationPoints.map((point, index) => (
              <button
                key={point.id}
                className="nav-point distributed"
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
                onClick={() => navigateToLocation(point.id)}
                title={`${point.label} - ${point.distance}`}
              >
                <span className="nav-icon">{point.icon}</span>
                <span className="nav-label">
                  {point.label}
                  <small>{point.distance}</small>
                </span>
              </button>
            ))}
            
            {/* Sequential Next Button */}
            <button
              className="nav-point sequential"
              style={{ left: '85%', top: '15%' }}
              onClick={navigateToNextLocation}
              title={`Continue to ${locations.find(loc => loc.id === currentLocation.nextLocation)?.name}`}
            >
              <span className="nav-icon">➡️</span>
              <span className="nav-label">
                Next: {locations.find(loc => loc.id === currentLocation.nextLocation)?.name}
              </span>
            </button>
          </div>
        )}

        {/* Carousel Navigation */}
        {viewMode === 'carousel' && (
          <div className="carousel-controls">
            <button 
              className="carousel-btn prev"
              onClick={() => navigateCarousel('prev')}
            >
              ‹
            </button>
            <button 
              className="carousel-btn next"
              onClick={() => navigateCarousel('next')}
            >
              ›
            </button>
          </div>
        )}

        {/* Location Images Navigation */}
        {viewMode === 'navigation' && currentLocation.images.length > 1 && (
          <div className="location-image-controls">
            <button 
              className="image-nav-btn prev"
              onClick={() => navigateImage('prev')}
            >
              ‹
            </button>
            <button 
              className="image-nav-btn next"
              onClick={() => navigateImage('next')}
            >
              ›
            </button>
          </div>
        )}
      </div>

      {/* Enhanced Controls */}
      <div className="tour-controls">
        <div className="zoom-controls">
          <button onClick={() => handleZoom(0.3)}>🔍+</button>
          <span>Zoom: {Math.round(zoom * 100)}%</span>
          <button onClick={() => handleZoom(-0.3)}>🔍-</button>
          <button onClick={resetView}>🎯 Reset</button>
          {isAR3DMode && (
            <span className="rotation-info">
              🔄 Smooth 3D Rotation: {Math.round(rotation.y)}° | Tilt: {Math.round(rotation.x)}°
            </span>
          )}
        </div>
        
        <div className="location-info">
          <h3>{viewMode === 'carousel' ? allImages[carouselIndex]?.locationName : currentLocation.name}</h3>
          <p>{viewMode === 'carousel' ? allImages[carouselIndex]?.description : currentLocation.description}</p>
          {viewMode === 'carousel' && (
            <div className="carousel-location-type">
              Type: {allImages[carouselIndex]?.locationType} | 
              Location {allImages[carouselIndex]?.localIndex + 1} of {allImages[carouselIndex]?.totalInLocation}
            </div>
          )}
          {viewMode === 'navigation' && currentLocation.images.length > 1 && (
            <div className="image-dots">
              {currentLocation.images.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sequential Tour Progress */}
      <div className="sequential-progress">
        <h4>Walking Experience Progress</h4>
        <div className="progress-steps">
          {locations.map((location, index) => (
            <div
              key={location.id}
              className={`progress-step ${location.id === currentLocationId ? 'current' : ''} ${visitedLocations.has(location.id) ? 'visited' : ''}`}
              onClick={() => navigateToLocation(location.id)}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-name">{location.name}</div>
              <div className="step-type">{location.type}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Location Map */}
      <div className="location-map">
        <h4>Quick Navigation</h4>
        <div className="map-grid">
          {locations.map(location => (
            <button
              key={location.id}
              className={`map-location ${location.id === currentLocationId ? 'current' : ''} ${visitedLocations.has(location.id) ? 'visited' : ''}`}
              onClick={() => navigateToLocation(location.id)}
              title={location.name}
            >
              {location.id === currentLocationId ? '📍' : visitedLocations.has(location.id) ? '✅' : '⭕'}
              <span>{location.name}</span>
              <small>{location.type}</small>
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Instructions */}
      <div className="tour-instructions">
        <h4>Enhanced Virtual Tour Navigation:</h4>
        <div className="instruction-grid">
          <div className="instruction-item">
            <strong>🗺️ Navigation Mode:</strong>
            <ul>
              <li>Click distributed navigation points on images</li>
              <li>Each point has location icon and distance</li>
              <li>Follow sequential "Next" button for guided tour</li>
            </ul>
          </div>
          <div className="instruction-item">
            <strong>🎠 Carousel Mode:</strong>
            <ul>
              <li>Browse ALL images from all locations</li>
              <li>Use arrows to see every single image</li>
              <li>Location info updates for each image</li>
            </ul>
          </div>
          <div className="instruction-item">
            <strong>🥽 AR 3D Mode:</strong>
            <ul>
              <li>Drag horizontally: Smooth horizontal rotation</li>
              <li>Drag vertically: Subtle tilt (limited)</li>
              <li>Like a real 3D body spinning around its axis</li>
            </ul>
          </div>
          <div className="instruction-item">
            <strong>🔍 Zoom & Controls:</strong>
            <ul>
              <li>Double-click to zoom in/out</li>
              <li>Scroll wheel for smooth zooming</li>
              <li>+/- buttons for manual control</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARViewer;

