import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bannerBg from '../assets/banner-bg.jpg';
import './HeroBanner.css';

const HeroBanner = ({ onAIPromptOpen }) => {
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIPromptToggle = () => {
    setShowAIPrompt(!showAIPrompt);
    if (onAIPromptOpen) {
      onAIPromptOpen(!showAIPrompt);
    }
  };

  const handleAISubmit = async (e) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);
    
    // Simulate AI response (in real app, this would call an AI API)
    setTimeout(() => {
      const responses = {
        'bahrain history': 'Bahrain has a rich history spanning over 4,000 years, from the ancient Dilmun civilization to modern times. The Bahrain Fort (Qal\'at al-Bahrain) is a UNESCO World Heritage site that showcases this incredible heritage.',
        'landmarks': 'Bahrain features 22 magnificent landmarks including the iconic Bahrain World Trade Center, the historic Bahrain Fort, the beautiful Al Fateh Grand Mosque, and the mysterious Tree of Life that has survived in the desert for over 400 years.',
        'culture': 'Bahraini culture is a beautiful blend of traditional Arab heritage and modern cosmopolitan influences. The country is known for its pearl diving history, traditional crafts, and warm hospitality.',
        'default': `Here's what I know about "${aiPrompt}": Bahrain is a fascinating island nation in the Persian Gulf, known for its rich cultural heritage, modern architecture, and historical significance. Would you like to explore our interactive landmarks to learn more?`
      };

      const key = Object.keys(responses).find(k => aiPrompt.toLowerCase().includes(k)) || 'default';
      setAiResponse(responses[key]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="hero-banner">
      <div className="hero-background">
        <img src={bannerBg} alt="Bahrain Skyline" className="hero-bg-image" />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Discover Bahrain's
            <span className="hero-highlight"> Rich Heritage</span>
          </h1>
          <p className="hero-subtitle">
            Explore 22 magnificent landmarks through interactive maps, virtual tours, 
            and AI-powered insights. Experience the perfect blend of ancient history 
            and modern innovation.
          </p>
        </div>
        
        <div className="hero-actions">
          <Link to="/landmarks" className="hero-btn hero-btn-primary">
            <span className="btn-icon">🏛️</span>
            Explore Landmarks
          </Link>
          
          <button 
            className="hero-btn hero-btn-secondary"
            onClick={handleAIPromptToggle}
          >
            <span className="btn-icon">🤖</span>
            Ask AI Guide
          </button>
        </div>
      </div>

      {/* AI Prompt Modal */}
      {showAIPrompt && (
        <div className="ai-prompt-modal">
          <div className="ai-prompt-content">
            <div className="ai-prompt-header">
              <h3>🤖 AI Heritage Guide</h3>
              <button 
                className="ai-close-btn"
                onClick={handleAIPromptToggle}
              >
                ×
              </button>
            </div>
            
            <div className="ai-prompt-body">
              <p>Ask me anything about Bahrain's landmarks, history, or culture!</p>
              
              <form onSubmit={handleAISubmit} className="ai-form">
                <div className="ai-input-group">
                  <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="e.g., Tell me about Bahrain Fort, What is the Tree of Life?"
                    className="ai-input"
                    disabled={isGenerating}
                  />
                  <button 
                    type="submit" 
                    className="ai-submit-btn"
                    disabled={isGenerating || !aiPrompt.trim()}
                  >
                    {isGenerating ? '🔄' : '🚀'}
                  </button>
                </div>
              </form>

              {isGenerating && (
                <div className="ai-loading">
                  <div className="loading-spinner"></div>
                  <p>AI is thinking...</p>
                </div>
              )}

              {aiResponse && !isGenerating && (
                <div className="ai-response">
                  <h4>💡 AI Response:</h4>
                  <p>{aiResponse}</p>
                  <div className="ai-suggestions">
                    <p><strong>Try asking:</strong></p>
                    <button onClick={() => setAiPrompt('Tell me about Bahrain Fort')} className="suggestion-btn">
                      Bahrain Fort history
                    </button>
                    <button onClick={() => setAiPrompt('What makes the Tree of Life special?')} className="suggestion-btn">
                      Tree of Life mystery
                    </button>
                    <button onClick={() => setAiPrompt('Bahrain cultural traditions')} className="suggestion-btn">
                      Cultural traditions
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroBanner;

