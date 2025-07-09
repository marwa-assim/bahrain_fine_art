import React, { useState, useRef, useEffect } from 'react';
import './EnhancedAIGenerator.css';

const EnhancedAIGenerator = ({ landmark }) => {
  const [activeTab, setActiveTab] = useState('chat');
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'ai',
      content: `Hello! I'm your AI guide for ${landmark.name}. Ask me anything about this landmark's history, architecture, cultural significance, or request custom images!`,
      timestamp: new Date()
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [imagePrompt, setImagePrompt] = useState('');
  const chatEndRef = useRef(null);

  // Landmark knowledge base
  const landmarkKnowledge = {
    'Bahrain Fort': {
      history: 'Qal\'at al-Bahrain is a UNESCO World Heritage Site with over 4,500 years of continuous occupation, representing the ancient Dilmun civilization.',
      architecture: 'Portuguese fortress built on ancient foundations, featuring stone walls, archaeological layers, and strategic coastal positioning.',
      significance: 'Symbol of Bahrain\'s rich heritage and the ancient Dilmun trading civilization.',
      facts: ['Built in the 16th century by Portuguese', 'Contains 7 layers of civilization', 'UNESCO World Heritage Site since 2005']
    },
    'Al Fateh Grand Mosque': {
      history: 'Built in 1987 and named after Ahmed Al Fateh, the conqueror of Bahrain.',
      architecture: 'Features the world\'s largest fiberglass dome and can accommodate over 7,000 worshippers.',
      significance: 'One of the largest mosques in the world and a symbol of Islamic architecture in Bahrain.',
      facts: ['Dome weighs over 60 tons', 'Library contains 7,000 books', 'Offers guided tours for visitors']
    },
    'Tree of Life': {
      history: 'A 400-year-old Prosopis cineraria tree surviving alone in the Arabian desert.',
      architecture: 'Natural wonder with extensive root system reaching underground water sources.',
      significance: 'Symbol of life\'s persistence and Bahrain\'s natural heritage.',
      facts: ['Stands 9.75 meters tall', 'No visible water source nearby', 'Attracts 65,000 visitors annually']
    },
    'Bahrain World Trade Center': {
      history: 'Completed in 2008 as the world\'s first skyscraper to integrate wind turbines.',
      architecture: 'Twin 50-story towers connected by three wind turbines generating renewable energy.',
      significance: 'Symbol of Bahrain\'s commitment to sustainable development and modern architecture.',
      facts: ['240 meters tall', 'Turbines generate 15% of building\'s power', 'LEED certified building']
    }
  };

  const quickQuestions = [
    'Tell me about the history of this landmark',
    'What makes this place architecturally unique?',
    'What is the cultural significance?',
    'Share some interesting facts',
    'What\'s the best time to visit?',
    'Generate an artistic image of this landmark'
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const generateAIResponse = (question) => {
    const landmarkData = landmarkKnowledge[landmark.name] || {
      history: 'This landmark has a rich history dating back centuries.',
      architecture: 'Features traditional Bahraini architectural elements.',
      significance: 'An important cultural and historical site in Bahrain.',
      facts: ['Significant cultural landmark', 'Popular tourist destination', 'Part of Bahrain\'s heritage']
    };

    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('history')) {
      return `📚 **Historical Background of ${landmark.name}**\n\n${landmarkData.history}\n\n${landmark.descriptionFull || landmark.descriptionShort}`;
    } else if (lowerQuestion.includes('architect') || lowerQuestion.includes('design') || lowerQuestion.includes('building')) {
      return `🏛️ **Architectural Features of ${landmark.name}**\n\n${landmarkData.architecture}\n\nThis landmark showcases the unique blend of traditional and modern architectural elements that make Bahrain's heritage so distinctive.`;
    } else if (lowerQuestion.includes('significance') || lowerQuestion.includes('important') || lowerQuestion.includes('cultural')) {
      return `🌟 **Cultural Significance of ${landmark.name}**\n\n${landmarkData.significance}\n\nThis site represents an important part of Bahrain's cultural identity and continues to play a vital role in preserving the kingdom's heritage.`;
    } else if (lowerQuestion.includes('fact') || lowerQuestion.includes('interesting')) {
      return `💡 **Fascinating Facts about ${landmark.name}**\n\n${landmarkData.facts.map((fact, index) => `${index + 1}. ${fact}`).join('\n')}\n\nThese unique characteristics make this landmark truly special and worth visiting!`;
    } else if (lowerQuestion.includes('visit') || lowerQuestion.includes('time') || lowerQuestion.includes('when')) {
      return `🕐 **Best Time to Visit ${landmark.name}**\n\nThe best time to visit is during the cooler months (November to March) when temperatures are more comfortable. Early morning or late afternoon visits offer the best lighting for photography and a more pleasant experience.\n\n📍 You can find directions and more details in the Directions tab!`;
    } else if (lowerQuestion.includes('image') || lowerQuestion.includes('generate') || lowerQuestion.includes('picture')) {
      return `🎨 **Image Generation Request**\n\nI'd be happy to generate a custom image of ${landmark.name}! Please switch to the "Image Generation" tab and describe the style or scene you'd like me to create. For example:\n\n• "${landmark.name} at sunset with dramatic lighting"\n• "${landmark.name} in futuristic cyberpunk style"\n• "${landmark.name} as a watercolor painting"\n\nWhat kind of artistic interpretation would you like to see?`;
    } else {
      return `🤖 **About ${landmark.name}**\n\n${landmark.descriptionShort}\n\n${landmarkData.history}\n\nWould you like to know more about its history, architecture, cultural significance, or shall I generate a custom image for you? Feel free to ask me anything!`;
    }
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const userMessage = {
      type: 'user',
      content: userInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    
    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse = {
        type: 'ai',
        content: generateAIResponse(userInput),
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setUserInput('');
  };

  const handleQuickQuestion = (question) => {
    setUserInput(question);
    handleSendMessage();
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return;

    setIsGenerating(true);
    
    // Simulate image generation (in real implementation, this would call an actual AI service)
    setTimeout(() => {
      const newImage = {
        id: Date.now(),
        prompt: imagePrompt,
        url: `https://picsum.photos/600/400?random=${Date.now()}`, // Placeholder
        timestamp: new Date()
      };
      
      setGeneratedImages(prev => [newImage, ...prev]);
      setIsGenerating(false);
      setImagePrompt('');
      
      // Add to chat
      const aiMessage = {
        type: 'ai',
        content: `🎨 I've generated a new image of ${landmark.name} based on your prompt: "${imagePrompt}"\n\nYou can view it in the Image Generation tab. Would you like me to create another variation or try a different style?`,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiMessage]);
    }, 3000);
  };

  const suggestedPrompts = [
    `${landmark.name} at golden hour with dramatic lighting`,
    `${landmark.name} in traditional watercolor painting style`,
    `${landmark.name} at night with illuminated architecture`,
    `${landmark.name} surrounded by lush gardens and fountains`,
    `${landmark.name} in futuristic cyberpunk style`,
    `${landmark.name} as seen from aerial drone perspective`
  ];

  return (
    <div className="enhanced-ai-generator">
      <div className="ai-header">
        <h3>🤖 AI Guide for {landmark.name}</h3>
        <div className="ai-tabs">
          <button 
            className={`ai-tab ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            💬 Chat Guide
          </button>
          <button 
            className={`ai-tab ${activeTab === 'generate' ? 'active' : ''}`}
            onClick={() => setActiveTab('generate')}
          >
            🎨 Image Generation
          </button>
        </div>
      </div>

      {activeTab === 'chat' && (
        <div className="ai-chat-container">
          <div className="chat-messages">
            {chatMessages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                <div className="message-content">
                  {message.content.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="quick-questions">
            <h4>Quick Questions:</h4>
            <div className="question-buttons">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  className="quick-question-btn"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={`Ask me anything about ${landmark.name}...`}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage} disabled={!userInput.trim()}>
              Send
            </button>
          </div>
        </div>
      )}

      {activeTab === 'generate' && (
        <div className="ai-generate-container">
          <div className="generate-input-section">
            <h4>🎨 Generate Custom Images</h4>
            <p>Describe the artistic style or scene you'd like me to create for {landmark.name}</p>
            
            <div className="prompt-input">
              <textarea
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                placeholder={`e.g., ${landmark.name} at sunset with dramatic golden lighting and traditional architecture details`}
                rows={3}
              />
              <button 
                onClick={handleGenerateImage}
                disabled={!imagePrompt.trim() || isGenerating}
                className="generate-btn"
              >
                {isGenerating ? '🎨 Generating...' : '✨ Generate Image'}
              </button>
            </div>

            <div className="suggested-prompts">
              <h5>Suggested Prompts:</h5>
              <div className="prompt-suggestions">
                {suggestedPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    className="suggestion-btn"
                    onClick={() => setImagePrompt(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="generated-images">
            <h4>Generated Images ({generatedImages.length})</h4>
            {generatedImages.length === 0 ? (
              <div className="no-images">
                <p>No images generated yet. Try creating your first custom image above!</p>
              </div>
            ) : (
              <div className="images-grid">
                {generatedImages.map((image) => (
                  <div key={image.id} className="generated-image">
                    <img src={image.url} alt={image.prompt} />
                    <div className="image-info">
                      <p className="image-prompt">"{image.prompt}"</p>
                      <p className="image-time">{image.timestamp.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedAIGenerator;

