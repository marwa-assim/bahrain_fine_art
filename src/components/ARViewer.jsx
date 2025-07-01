import React from "react";

const ARViewer = ({ modelUrl }) => {
  if (!modelUrl) {
    return <p>This landmark does not have an AR model yet.</p>;
  }

  return (
    <div>
      <model-viewer
        src={modelUrl}
        ar
        ar-modes="scene-viewer webxr quick-look"
        auto-rotate
        camera-controls
        style={{ width: "100%", height: "500px" }}
      ></model-viewer>
    </div>
  );
};

export default ARViewer;
