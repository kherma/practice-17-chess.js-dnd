import React from "react";

const Piece = ({ piece: { type, color } }) => {
  const pieceImg = require(`../assets/${type}_${color}.png`);
  return (
    <div className="piece-container">
      <img src={pieceImg} alt={`${type}_${color}.png`} className="piece" />
    </div>
  );
};

export default Piece;
