import React from "react";
import { move } from "../Game";
const promotionPieces = ["r", "n", "b", "q"];

const Promote = ({ promotion: { from, to, color } }) => {
  return (
    <div className="board">
      {promotionPieces.map((piece, index) => (
        <div key={index} className="square-promote">
          <div
            className="piece-container"
            onClick={() => move(from, to, piece)}
          >
            <img
              className="piece cursor-pointer"
              src={require(`../assets/${piece}_${color}.png`)}
              alt=""
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Promote;
