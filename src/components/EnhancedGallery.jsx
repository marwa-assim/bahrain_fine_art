import React, { useState, useEffect } from 'react';
import './EnhancedGallery.css';

const EnhancedGallery = ({ landmark }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = import.meta.glob('/public/gallery/**/*.{jpg,jpeg,png,webp}', { eager: true });

  const galleryImages = [];
const baseFolder = `${landmark.id}_${landmark.name.replace(/\s+/g, '_')}`;
const imageExtensions = ['jpg', 'jpeg', 'png', 'webp'];
const maxImages = 50;

for (let i = 1; i <= maxImages; i++) {
  for (const ext of imageExtensions) {
    const cleanName = landmark.name.replace(/\s+/g, '');
    const fileName = `${landmark.id}_${cleanName}_${i}.${ext}`;
    const url = `/gallery/${baseFolder}/${fileName}`;

    // Optional: Check image availability using browser preload trick (if you want to skip broken images)
    galleryImages.push({
      url,
      category: fileName.toLowerCase().includes('interior') ? 'interior'
              : fileName.toLowerCase().includes('aerial') ? 'aerial'
              : 'exterior',
      title: `${landmark.name} - Image ${i}`,
      description: `Photo showing ${landmark.name}`
    });
  }
}


  if (!galleryImages || galleryImages.length === 0) {
    return <p style={{ padding: '1rem', textAlign: 'center' }}>No gallery images available.</p>;
  }

  const filteredImages = currentCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === currentCategory);

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

      <div className="download-section">
        <h4>💾 Download Options</h4>
        <p>All images are available in high resolution for educational and personal use.</p>
        <div className="download-buttons">
          <button className="download-btn">📱 Mobile Wallpapers</button>
          <button className="download-btn">🖥️ Desktop Wallpapers</button>
          <button className="download-btn">📄 Print Quality</button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedGallery;
