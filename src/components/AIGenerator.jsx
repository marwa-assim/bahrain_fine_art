import React, { useState } from "react";

const AIGenerator = ({ landmark }) => {
  const [prompt, setPrompt] = useState("");
  const [generatedImg, setGeneratedImg] = useState(null);

  const handleGenerate = () => {
    // Simulated image generation
    setGeneratedImg(`https://api.dummyimage.com/600x400/000/fff&text=${encodeURIComponent(prompt)}`);
  };

  return (
    <div>
      <h3>Generate AI Image for {landmark.name}</h3>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={`e.g., ${landmark.name} at night in futuristic style`}
      />
      <button onClick={handleGenerate}>Generate</button>
      {generatedImg && (
        <img
          src={generatedImg}
          alt="AI Generated"
          style={{ marginTop: "1rem", maxWidth: "100%" }}
        />
      )}
    </div>
  );
};

export default AIGenerator;
