import React from 'react';
import './FeatureBoxes.css';

const FeatureBoxes = () => {
  const features = [
    {
      id: 1,
      icon: '🗺️',
      title: 'Interactive Map',
      description: 'Explore Bahrain\'s landmarks through our beautifully crafted mosaic map. Each tile represents a piece of Bahrain\'s rich heritage, positioned geographically for an authentic exploration experience.',
      highlights: ['256 Interactive Tiles', 'Geographic Positioning', 'Visual Categories', 'Smooth Animations']
    },
    {
      id: 2,
      icon: '🏛️',
      title: 'Rich Details & AR Views',
      description: 'Immerse yourself in virtual tours using real photographs. Experience landmarks from multiple perspectives with zoom, pan, and interactive navigation through interior and exterior spaces.',
      highlights: ['Virtual Photo Tours', 'Multiple Viewpoints', 'Interactive Hotspots', 'High-Resolution Images']
    },
    {
      id: 3,
      icon: '🤖',
      title: 'AI Integration',
      description: 'Get instant answers about Bahrain\'s history, culture, and landmarks from our intelligent AI guide. Generate custom images and discover fascinating insights about each heritage site.',
      highlights: ['Smart Chatbot', 'Historical Insights', 'Image Generation', 'Cultural Knowledge']
    }
  ];

  return (
    <div className="feature-boxes">
      <div className="feature-container">
        <div className="feature-header">
          <h2 className="feature-title">Discover Bahrain Like Never Before</h2>
          <p className="feature-subtitle">
            Experience the perfect blend of technology and heritage through our innovative features
          </p>
        </div>
        
        <div className="feature-grid">
          {features.map((feature) => (
            <div key={feature.id} className="feature-box">
              <div className="feature-icon">
                <span className="icon-emoji">{feature.icon}</span>
                <div className="icon-glow"></div>
              </div>
              
              <div className="feature-content">
                <h3 className="feature-box-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                
                <div className="feature-highlights">
                  {feature.highlights.map((highlight, index) => (
                    <span key={index} className="highlight-tag">
                      ✨ {highlight}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="feature-overlay">
                <div className="overlay-content">
                  <h4>Experience {feature.title}</h4>
                  <p>Discover the power of interactive heritage exploration</p>
                  <button className="overlay-btn">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="feature-stats">
          <div className="stat-item">
            <div className="stat-number">22</div>
            <div className="stat-label">Heritage Sites</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4000+</div>
            <div className="stat-label">Years of History</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">8</div>
            <div className="stat-label">Categories</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">∞</div>
            <div className="stat-label">Discoveries</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureBoxes;

