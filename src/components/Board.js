import React from "react";
import BoardSquare from "./BoardSquare";

const Board = ({ board }) => {
  const getXYPosition = (index) => {
    const x = index % 8;
    const y = Math.abs(Math.floor(index / 8) - 7);
    return { x, y };
  };
  const getSquareColor = (index) => {
    const { x, y } = getXYPosition(index);
    return (x + y) % 2 === 1 ? "square-white" : "square-black";
  };
  return (
    <div className="board">
      {board.flat().map((piece, index) => (
        <div key={index} className="square">
          <BoardSquare piece={piece} squareColor={getSquareColor(index)} />
        </div>
      ))}
    </div>
  );
};

export default Board;
