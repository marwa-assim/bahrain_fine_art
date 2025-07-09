import React, { useState } from 'react';

const PromptGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');

  const handleGenerate = () => {
    if (prompt.trim()) {
      setResult(`🔍 Landmark based on your prompt: "${prompt}" (AI module coming soon)`);
      setPrompt('');
    }
  };

  return (
    <div className="prompt-generator">
      <input
        type="text"
        placeholder="Enter a prompt to generate landmark..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={handleGenerate}>Generate</button>
      {result && <p className="result-text">{result}</p>}
    </div>
  );
};

export default PromptGenerator;
