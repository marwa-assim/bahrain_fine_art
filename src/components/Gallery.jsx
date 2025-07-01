// components/Gallery.jsx
import React from "react";
import "../styles/Gallery.css"; // optional styling

const Gallery = ({ images }) => {
  return (
    <div className="gallery">
      {images.map((src, index) => (
        <img key={index} src={src} alt={`Gallery Image ${index + 1}`} className="gallery-image" />
      ))}
    </div>
  );
};

export default Gallery;
