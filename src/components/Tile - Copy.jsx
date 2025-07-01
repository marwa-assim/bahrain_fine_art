import React from 'react';

const Tile = ({ landmark, onClick }) => {
  return (
    <div
      className="tile"
      onClick={() => onClick(landmark)}
      style={{
        backgroundImage: `url(${landmark.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        aspectRatio: '1 / 1'
      }}
      title={landmark.name}
    />
  );
};

export default Tile;
