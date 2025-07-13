import React, { useState, useEffect, useRef } from 'react';
import './FixedVirtualTour.css';

const FixedVirtualTour = () => {
  // Enhanced tour locations with distributed navigation points
  const locations = [
    {
      id: 'overview',
      name: 'Aerial Overview',
      type: 'aerial',
      images: [
        '/images/landmarks/bahrain-fort/overview/1.jpg',
        '/images/landmarks/bahrain-fort/overview/2.jpg'
      ],
      description: 'Bird\'s eye view of the entire fort complex',
      nextLocation: 'entrance',
      navigationPoints: [
        { id: 'entrance', x: 60, y: 70, icon: '🚪', label: 'Main Entrance', distance: '50m' },
        { id: 'walls', x: 80, y: 30, icon: '🧱', label: 'Fortress Walls', distance: '30m' },
        { id: 'courtyard', x: 45, y: 50, icon: '🏛️', label: 'Central Area', distance: '40m' }
      ]
    },
    {
      id: 'entrance',
      name: 'Main Entrance',
      type: 'exterior',
      images: [
        '/images/landmarks/bahrain-fort/entrance/1.jpg',
        '/images/landmarks/bahrain-fort/entrance/2.jpg',
        '/images/landmarks/bahrain-fort/entrance/3.jpg'
      ],
      description: 'Ancient entrance to Bahrain Fort',
      nextLocation: 'courtyard',
      navigationPoints: [
        { id: 'courtyard', x: 70, y: 40, icon: '🏛️', label: 'Enter Courtyard', distance: '10m' },
        { id: 'overview', x: 20, y: 20, icon: '🚁', label: 'Aerial View', distance: '50m' },
        { id: 'walls', x: 85, y: 60, icon: '🧱', label: 'Fortress Walls', distance: '15m' }
      ]
    },
    {
      id: 'courtyard',
      name: 'Central Courtyard',
      type: 'exterior',
      images: [
        '/images/landmarks/bahrain-fort/courtyard/1.jpg',
        '/images/landmarks/bahrain-fort/courtyard/2.jpg',
        '/images/landmarks/bahrain-fort/courtyard/3.jpg'
      ],
      description: 'Archaeological courtyard with ancient remains',
      nextLocation: 'chamber1',
      navigationPoints: [
        { id: 'chamber1', x: 55, y: 65, icon: '🚪', label: 'Main Chamber', distance: '5m' },
        { id: 'entrance', x: 30, y: 80, icon: '↩️', label: 'Back to Entrance', distance: '10m' },
        { id: 'artifacts', x: 75, y: 35, icon: '🏺', label: 'Artifacts Area', distance: '8m' },
        { id: 'secret', x: 90, y: 70, icon: '🔐', label: 'Hidden Passage', distance: '12m' }
      ]
    },
    {
      id: 'chamber1',
      name: 'Main Chamber',
      type: 'interior',
      images: [
        '/images/landmarks/bahrain-fort/chamber1/1.jpg',
        '/images/landmarks/bahrain-fort/chamber1/2.jpg'
      ],
      description: 'Interior chamber with artifacts',
      nextLocation: 'chamber2',
      navigationPoints: [
        { id: 'chamber2', x: 80, y: 45, icon: '➡️', label: 'Inner Chamber', distance: '3m' },
        { id: 'courtyard', x: 20, y: 75, icon: '↩️', label: 'Back to Courtyard', distance: '5m' },
        { id: 'secret', x: 65, y: 25, icon: '🔐', label: 'Secret Passage', distance: '7m' }
      ]
    },
    {
      id: 'chamber2',
      name: 'Inner Chamber',
      type: 'interior',
      images: [
        '/images/landmarks/bahrain-fort/chamber2/1.jpg',
        '/images/landmarks/bahrain-fort/chamber2/2.jpg'
      ],
      description: 'Deep interior chamber',
      nextLocation: 'secret',
      navigationPoints: [
        { id: 'secret', x: 75, y: 55, icon: '🔐', label: 'Secret Passage', distance: '4m' },
        { id: 'chamber1', x: 25, y: 60, icon: '↩️', label: 'Main Chamber', distance: '3m' },
        { id: 'artifacts', x: 60, y: 80, icon: '🏺', label: 'Artifacts Display', distance: '6m' }
      ]
    },
    {
      id: 'secret',
      name: 'Secret Passage',
      type: 'interior',
      images: [
        '/images/landmarks/bahrain-fort/secret/1.jpg',
        '/images/landmarks/bahrain-fort/secret/2.jpg'
      ],
      description: 'Hidden passage with ancient secrets',
      nextLocation: 'artifacts',
      navigationPoints: [
        { id: 'artifacts', x: 70, y: 40, icon: '🏺', label: 'Artifacts Room', distance: '5m' },
        { id: 'chamber2', x: 30, y: 65, icon: '↩️', label: 'Inner Chamber', distance: '4m' },
        { id: 'walls', x: 85, y: 25, icon: '⬆️', label: 'Up to Walls', distance: '15m' }
      ]
    },
    {
      id: 'artifacts',
      name: 'Artifacts Display',
      type: 'details',
      images: [
        '/images/landmarks/bahrain-fort/artifacts/1.jpg',
        '/images/landmarks/bahrain-fort/artifacts/2.jpg'
      ],
      description: 'Close-up view of ancient artifacts',
      nextLocation: 'walls',
      navigationPoints: [
        { id: 'walls', x: 60, y: 30, icon: '⬆️', label: 'Fortress Walls', distance: '20m' },
        { id: 'secret', x: 40, y: 70, icon: '🔐', label: 'Secret Passage', distance: '5m' },
        { id: 'courtyard', x: 20, y: 50, icon: '🏛️', label: 'Courtyard', distance: '8m' }
      ]
    },
    {
      id: 'walls',
      name: 'Fortress Walls',
      type: 'exterior',
      images: [
        '/images/landmarks/bahrain-fort/walls/1.jpg',
        '/images/landmarks/bahrain-fort/walls/2.jpg'
      ],
      description: 'Ancient fortress walls overlooking the sea',
      nextLocation: 'overview',
      navigationPoints: [
        { id: 'overview', x: 50, y: 20, icon: '🚁', label: 'Aerial Overview', distance: '30m' },
        { id: 'entrance', x: 25, y: 80, icon: '⬇️', label: 'Down to Entrance', distance: '15m' },
        { id: 'artifacts', x: 75, y: 65, icon: '⬇️', label: 'Down to Artifacts', distance: '20m' }
      ]
    }
  ];

  // Create all images array for carousel mode
  const allImages = locations.flatMap((location, locationIndex) => 
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

  const [currentLocationId, setCurrentLocationId] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [visitedLocations, setVisitedLocations] = useState(new Set(['overview']));
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

  const currentLocation = locations.find(loc => loc.id === currentLocationId);
  const currentImage = viewMode === 'carousel' 
    ? allImages[carouselIndex]?.src 
    : currentLocation.images[currentImageIndex];
  const progress = Math.round((visitedLocations.size / locations.length) * 100);

  // Navigate to specific location
  const navigateToLocation = (locationId) => {
    setCurrentLocationId(locationId);
    setCurrentImageIndex(0);
    setVisitedLocations(prev => new Set([...prev, locationId]));
    resetView();
  };

  // Sequential navigation
  const navigateToNextLocation = () => {
    const nextLocationId = currentLocation.nextLocation;
    if (nextLocationId) {
      navigateToLocation(nextLocationId);
    }
  };

  // Navigate images within current location
  const navigateImage = (direction) => {
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
    if (viewMode === 'carousel') {
      const currentGlobalIndex = allImages.findIndex(img => 
        img.locationId === currentLocationId && img.localIndex === currentImageIndex
      );
      if (currentGlobalIndex !== -1) {
        setCarouselIndex(currentGlobalIndex);
      }
    }
  }, [viewMode, currentLocationId, currentImageIndex]);

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

export default FixedVirtualTour;

