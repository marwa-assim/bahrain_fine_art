import React, { useState, useEffect } from 'react';
import './EnhancedGallery.css';

const EnhancedGallery = ({ landmark }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Enhanced gallery with high-resolution images
  const enhancedGallery = {
    'Bahrain Fort': [
      { url: '/images/enhanced/d7r6KQ4IauPx.jpg', category: 'interior', title: 'Arched Gallery Interior', description: 'Beautiful arched corridors inside Qal\'at al-Bahrain' },
      { url: '/images/enhanced/1iaUrtbkldgg.jpg', category: 'exterior', title: 'Fort Exterior View', description: 'Panoramic view of the ancient fortress' },
      { url: '/images/enhanced/aiBWk6XDb0AM.jpg', category: 'aerial', title: 'Aerial Perspective', description: 'Bird\'s eye view of the UNESCO World Heritage Site' },
      ...landmark.gallery.map((img, index) => ({
        url: img,
        category: index % 3 === 0 ? 'exterior' : index % 3 === 1 ? 'interior' : 'details',
        title: `${landmark.name} View ${index + 1}`,
        description: `Professional photograph of ${landmark.name}`
      }))
    ],
    'Al Fateh Grand Mosque': [
      { url: '/images/enhanced/dH2iPJTbveKr.jpeg', category: 'interior', title: 'Interior Dome View', description: 'Magnificent interior view of the world\'s largest fiberglass dome' },
      { url: '/images/enhanced/iugXjwGkgLWJ.jpeg', category: 'exterior', title: 'Mosque Exterior', description: 'Stunning exterior architecture of Al Fateh Grand Mosque' },
      { url: '/images/enhanced/YIZYWDhElKRH.jpg', category: 'night', title: 'Evening Illumination', description: 'Beautiful night lighting of the mosque' },
      { url: '/images/enhanced/STLnLG8h3L1g.jpg', category: 'details', title: 'Architectural Details', description: 'Close-up of Islamic architectural elements' },
      { url: '/images/enhanced/I2Qemry7rnhm.jpg', category: 'aerial', title: 'Aerial View', description: 'Magnificent aerial perspective of the grand mosque' },
      ...landmark.gallery.map((img, index) => ({
        url: img,
        category: index % 4 === 0 ? 'exterior' : index % 4 === 1 ? 'interior' : index % 4 === 2 ? 'details' : 'night',
        title: `${landmark.name} View ${index + 1}`,
        description: `Professional photograph of ${landmark.name}`
      }))
    ],
    'Tree of Life': [
      { url: '/images/enhanced/YgA6S0E7FeAP.jpg', category: 'landscape', title: 'Desert Survivor', description: '400-year-old tree standing alone in the Arabian desert' },
      { url: '/images/enhanced/lXtnouay0A8e.jpg', category: 'details', title: 'Tree Details', description: 'Close-up view of the ancient tree\'s branches and trunk' },
      { url: '/images/enhanced/kmkYVutQMCIq.jpeg', category: 'sunset', title: 'Golden Hour', description: 'Tree of Life during beautiful sunset lighting' },
      ...landmark.gallery.map((img, index) => ({
        url: img,
        category: index % 3 === 0 ? 'landscape' : index % 3 === 1 ? 'details' : 'sunset',
        title: `${landmark.name} View ${index + 1}`,
        description: `Professional photograph of ${landmark.name}`
      }))
    ],
    'Bahrain World Trade Center': [
      { url: '/images/enhanced/xjLvmNE9Q6dP.jpg', category: 'exterior', title: 'Iconic Twin Towers', description: 'The world\'s first skyscraper with integrated wind turbines' },
      { url: '/images/enhanced/k6MESmazmtUc.webp', category: 'architecture', title: 'Architectural Marvel', description: 'Modern sustainable architecture in Bahrain' },
      { url: '/images/enhanced/MYpFyFYGZjiH.webp', category: 'details', title: 'Tower Details', description: 'Close-up view of the innovative wind turbine design' },
      { url: '/images/enhanced/Wzsx1PjUrnxS.jpg', category: 'aerial', title: 'Aerial Perspective', description: 'Bird\'s eye view of the twin towers' },
      { url: '/images/enhanced/kYALDIYR9neG.jpg', category: 'night', title: 'Night Illumination', description: 'Beautiful night lighting of the towers' },
      ...landmark.gallery.map((img, index) => ({
        url: img,
        category: index % 4 === 0 ? 'exterior' : index % 4 === 1 ? 'architecture' : index % 4 === 2 ? 'details' : 'night',
        title: `${landmark.name} View ${index + 1}`,
        description: `Professional photograph of ${landmark.name}`
      }))
    ]
  };

  // Default gallery for landmarks not in enhanced list
  const defaultGallery = landmark.gallery.map((img, index) => ({
    url: img,
    category: index % 3 === 0 ? 'exterior' : index % 3 === 1 ? 'interior' : 'details',
    title: `${landmark.name} View ${index + 1}`,
    description: `Professional photograph of ${landmark.name}`
  }));

  const galleryImages = enhancedGallery[landmark.name] || defaultGallery;

  if (!galleryImages || galleryImages.length === 0) {
  return <p style={{ padding: '1rem', textAlign: 'center' }}>No gallery images available.</p>;
}


  // Filter images by category
  const filteredImages = currentCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === currentCategory);

  // Get unique categories
  const categories = ['all', ...new Set(galleryImages.map(img => img.category))];

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? filteredImages.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  const handleKeyPress = (e) => {
    if (isLightboxOpen) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isLightboxOpen, currentImageIndex]);

  return (
    <div className="enhanced-gallery">
      <div className="gallery-header">
        <h3>📸 High-Resolution Gallery: {landmark.name}</h3>
        <p className="gallery-description">
          Explore {filteredImages.length} professional photographs showcasing the beauty and architectural details of {landmark.name}
        </p>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        <h4>Filter by Category:</h4>
        <div className="filter-buttons">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${currentCategory === category ? 'active' : ''}`}
              onClick={() => setCurrentCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)} 
              {category === 'all' ? ` (${galleryImages.length})` : ` (${galleryImages.filter(img => img.category === category).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {filteredImages.map((image, index) => (
          <div 
            key={index} 
            className="gallery-item"
            onClick={() => openLightbox(image, index)}
          >
            <div className="image-container">
              <img 
                src={image.url} 
                alt={image.title}
                loading="lazy"
              />
              <div className="image-overlay">
                <div className="overlay-content">
                  <h5>{image.title}</h5>
                  <p>{image.description}</p>
                  <span className="category-tag">{image.category}</span>
                </div>
                <div className="zoom-icon">🔍</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gallery Stats */}
      <div className="gallery-stats">
        <div className="stat-item">
          <span className="stat-number">{galleryImages.length}</span>
          <span className="stat-label">Total Images</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{categories.length - 1}</span>
          <span className="stat-label">Categories</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">HD</span>
          <span className="stat-label">Quality</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">📷</span>
          <span className="stat-label">Professional</span>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && selectedImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>×</button>
            
            <div className="lightbox-image-container">
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title}
                className="lightbox-image"
              />
              
              <button className="lightbox-nav prev" onClick={prevImage}>‹</button>
              <button className="lightbox-nav next" onClick={nextImage}>›</button>
            </div>

            <div className="lightbox-info">
              <h4>{selectedImage.title}</h4>
              <p>{selectedImage.description}</p>
              <div className="lightbox-meta">
                <span className="category-badge">{selectedImage.category}</span>
                <span className="image-counter">
                  {currentImageIndex + 1} of {filteredImages.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download Section */}
      <div className="download-section">
        <h4>💾 Download Options</h4>
        <p>All images are available in high resolution for educational and personal use.</p>
        <div className="download-buttons">
          <button className="download-btn">
            📱 Mobile Wallpapers
          </button>
          <button className="download-btn">
            🖥️ Desktop Wallpapers
          </button>
          <button className="download-btn">
            📄 Print Quality
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedGallery;

