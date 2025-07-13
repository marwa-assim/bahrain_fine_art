import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { landmarks } from "../data/landmarks.js";
import './LandmarksPage.css';

const LandmarksPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('id');
  const [viewMode, setViewMode] = useState('grid'); // Default to grid view
  const [galleryMap, setGalleryMap] = useState({});
  const fallbackImage = '/bahrain_fine_art/default.jpg'; // Make sure this image exists in public folder


  useEffect(() => {
  fetch('/bahrain_fine_art/galleryIndex.json')
    .then(res => res.json())
    .then(data => setGalleryMap(data))
    .catch(err => console.error('Gallery index load error:', err));
}, []);


  // Enhanced categories with proper classification
  const categories = {
    all: 'All Landmarks',
    historical: 'Historical Sites',
    religious: 'Religious Sites',
    modern: 'Modern Architecture',
    cultural: 'Cultural Centers',
    nature: 'Natural Wonders',
    shopping: 'Shopping & Entertainment',
    museums: 'Museums & Heritage',
    forts: 'Forts & Castles'
  };

  // Enhanced landmarks data with proper categorization
  
  const enhancedLandmarks = landmarks.map(landmark => ({
    ...landmark,
    category: getCategoryForLandmark(landmark.name),
    rating: Math.floor(Math.random() * 2) + 4, // 4-5 star rating
    visitDuration: getVisitDuration(landmark.name),
    bestTimeToVisit: getBestTimeToVisit(landmark.name),
    entryFee: getEntryFee(landmark.name),
    facilities: getFacilities(landmark.name)
  }));

  function getCategoryForLandmark(name) {
    const categoryMap = {
      'Bahrain Fort': 'historical',
      'Al Fateh Grand Mosque': 'religious',
      'Tree of Life': 'nature',
      'Bahrain World Trade Center': 'modern',
      'Bahrain National Museum': 'museums',
      'Manama Souq': 'shopping',
      'Bab Al Bahrain': 'historical',
      'Arad Fort': 'forts',
      'Riffa Fort': 'forts',
      'Al Jasra Handicrafts Centre': 'cultural',
      'Bahrain International Circuit': 'modern',
      'King Fahd Causeway': 'modern',
      'Dilmun Burial Mounds': 'historical',
      'Muharraq Traditional Architecture': 'cultural',
      'Pearl Diving Heritage': 'cultural',
      'Al Areen Wildlife Park': 'nature',
      'Bahrain Financial Harbour': 'modern',
      'Oil Museum': 'museums',
      'Royal Camel Farm': 'nature',
      'Sakhir Palace': 'historical',
      'City Centre Bahrain': 'shopping',
      'Seef Mall': 'shopping'
    };
    return categoryMap[name] || 'cultural';
  }

  function getVisitDuration(name) {
    const durationMap = {
      'Bahrain Fort': '2-3 hours',
      'Al Fateh Grand Mosque': '1-2 hours',
      'Tree of Life': '1 hour',
      'Bahrain World Trade Center': '1 hour',
      'Bahrain National Museum': '2-3 hours',
      'Manama Souq': '2-4 hours'
    };
    return durationMap[name] || '1-2 hours';
  }

  function getBestTimeToVisit(name) {
    if (name.includes('Mosque')) return 'Morning or Evening';
    if (name.includes('Souq') || name.includes('Mall')) return 'Evening';
    if (name.includes('Tree') || name.includes('Fort')) return 'Early Morning or Late Afternoon';
    return 'Morning';
  }

  function getEntryFee(name) {
    const feeMap = {
      'Bahrain Fort': 'Free',
      'Al Fateh Grand Mosque': 'Free',
      'Tree of Life': 'Free',
      'Bahrain National Museum': '1 BD',
      'Bahrain International Circuit': '5-50 BD'
    };
    return feeMap[name] || 'Free';
  }

  function getFacilities(name) {
    const facilitiesMap = {
      'Bahrain Fort': ['Parking', 'Guided Tours', 'Museum', 'Gift Shop'],
      'Al Fateh Grand Mosque': ['Parking', 'Guided Tours', 'Library', 'Prayer Facilities'],
      'Tree of Life': ['Parking', 'Viewing Area'],
      'Bahrain National Museum': ['Parking', 'Café', 'Gift Shop', 'Audio Guide'],
      'Manama Souq': ['Traditional Shopping', 'Restaurants', 'Cultural Experience']
    };
    return facilitiesMap[name] || ['Parking', 'Information Center'];
  }

  function getLandmarkPreviewImage(landmark) {
  const folderPrefix = `${landmark.id}_`;
  const folderKey = Object.keys(galleryMap).find(key => key.startsWith(folderPrefix));

  if (folderKey && galleryMap[folderKey].length > 0) {
    return `/bahrain_fine_art/gallery/${folderKey}/${galleryMap[folderKey][0]}`;
  }

  return ''; // or null
}

  // Filter and search logic
  const filteredLandmarks = useMemo(() => {
    let filtered = enhancedLandmarks;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(landmark => landmark.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(landmark =>
        landmark.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        landmark.descriptionShort.toLowerCase().includes(searchTerm.toLowerCase()) ||
        landmark.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort landmarks
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  // Get category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: enhancedLandmarks.length };
    Object.keys(categories).forEach(category => {
      if (category !== 'all') {
        counts[category] = enhancedLandmarks.filter(l => l.category === category).length;
      }
    });
    return counts;
  }, []);

  return (
    <div className="enhanced-landmarks-page">
      {/* Header Section */}
      <div className="landmarks-header">
        <div className="header-content">
          <h1>🏛️ Discover Bahrain's  <span className="hero-highlight"> Rich Heritage</span></h1>
          <p className="header-subtitle">
            Explore {enhancedLandmarks.length} magnificent landmarks that showcase Bahrain's rich cultural heritage, 
            from ancient forts to modern architectural marvels.
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="search-container">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search landmarks by name, description, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        <div className="filter-controls">
          <div className="category-filters">
            <h3>Filter by Category:</h3>
            <div className="category-buttons">
              {Object.entries(categories).map(([key, label]) => (
                <button
                  key={key}
                  className={`category-btn ${selectedCategory === key ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(key)}
                >
                  {label} ({categoryCounts[key] || 0})
                </button>
              ))}
            </div>
          </div>

          <div className="sort-view-controls">
            <div className="sort-control">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name">Name</option>
                <option value="rating">Rating</option>
                <option value="category">Category</option>
              </select>
            </div>

            <div className="view-control">
              <label>View:</label>
              <div className="view-buttons">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  ⊞ Grid
                </button>
                <button
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  ☰ List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="results-summary">
        <p>
          Showing <strong>{filteredLandmarks.length}</strong> of <strong>{enhancedLandmarks.length}</strong> landmarks
          {selectedCategory !== 'all' && ` in ${categories[selectedCategory]}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>

      {/* Landmarks Grid/List */}
      <div className={`landmarks-container ${viewMode === 'grid' ? 'landmarks-grid' : 'list'}`}>
        {filteredLandmarks.length === 0 ? (
          <div className="no-results">
            <h3>No landmarks found</h3>
            <p>Try adjusting your search terms or category filters.</p>
          </div>
        ) : (
          filteredLandmarks.map((landmark, index) => (
            <div key={index} className="landmark-card">
              <div className="landmark-image">
                {getLandmarkPreviewImage(landmark) ? (
              <img 
              src={getLandmarkPreviewImage(landmark) || fallbackImage} 
              alt={landmark.name} 
              onError={(e) => { e.target.src = fallbackImage; }} 
              />
                ) : (
               <div className="image-placeholder">No image available</div>
                )}
                <div className="landmark-category-badge">
                  {categories[landmark.category]}
                </div>
                <div className="landmark-rating">
                  {'★'.repeat(landmark.rating)}{'☆'.repeat(5 - landmark.rating)}
                </div>
              </div>

              <div className="landmark-content">
                <h3 className="landmark-title">{landmark.name}</h3>
                <p className="landmark-description">{landmark.descriptionShort}</p>

                <div className="landmark-details">
                  <div className="detail-item">
                    <span className="detail-icon">⏱️</span>
                    <span>{landmark.visitDuration}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">🕐</span>
                    <span>{landmark.bestTimeToVisit}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">💰</span>
                    <span>{landmark.entryFee}</span>
                  </div>
                </div>

                <div className="landmark-facilities">
                  {landmark.facilities.slice(0, 3).map((facility, i) => (
                    <span key={i} className="facility-tag">{facility}</span>
                  ))}
                  {landmark.facilities.length > 3 && (
                    <span className="facility-more">+{landmark.facilities.length - 3} more</span>
                  )}
                </div>

                <div className="landmark-actions">
                  <Link 
                   to={`/landmarks/${landmark.id}`}
                   className="action-btn primary"
                  >
                    📖 View Details
                  </Link>
                  <button className="action-btn secondary">
                    🗺️ Directions
                  </button>
                  <button className="action-btn secondary">
                    📱 AR View
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-card">
          <span className="stat-number">{enhancedLandmarks.length}</span>
          <span className="stat-label">Total Landmarks</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{Object.keys(categories).length - 1}</span>
          <span className="stat-label">Categories</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{enhancedLandmarks.filter(l => l.entryFee === 'Free').length}</span>
          <span className="stat-label">Free Entry</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">4.5★</span>
          <span className="stat-label">Avg Rating</span>
        </div>
      </div>

      {/* Add New Landmark Section */}
      <div className="add-landmark-section">
        <h3>🏗️ Suggest a New Landmark</h3>
        <p>Know of a landmark that should be featured? Help us expand our collection!</p>
        <button className="add-landmark-btn">
          ➕ Suggest New Landmark
        </button>
      </div>
    </div>
  );
};

export default LandmarksPage;

