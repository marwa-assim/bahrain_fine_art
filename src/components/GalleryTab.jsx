import React, { useState } from 'react';

const GalleryTab = ({ galleryPath, landmarkId, landmarkName }) => {
  const baseName = `${landmarkId}_${landmarkName.replace(/\s+/g, '')}`;

  const imageSources = Array.from({ length: 8 }, (_, i) => {
    const filename = `${baseName}_${String(i + 1).padStart(2, '0')}`;
    return {
      primary: `${galleryPath}${filename}.jpeg`,
      fallback: `${galleryPath}${filename}.jpg`,
    };
  });

  const [errorImages, setErrorImages] = useState({});

  const handleError = (index) => {
    setErrorImages((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {imageSources.map((srcObj, index) => {
        const src = errorImages[index] ? srcObj.fallback : srcObj.primary;
        return (
          <img
            key={index}
            src={src}
            alt={`Gallery ${index + 1}`}
            onError={() => handleError(index)}
            className="rounded-lg shadow hover:scale-105 transition-transform duration-300"
          />
        );
      })}
    </div>
  );
};

export default GalleryTab;
