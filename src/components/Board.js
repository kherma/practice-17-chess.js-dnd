import React, { useEffect, useState } from "react";
import BoardSquare from "./BoardSquare";

const Board = ({ board, turn }) => {
  const [currentBoard, setCurrentBoard] = useState([]);

  useEffect(() => {
    setCurrentBoard(turn === "w" ? board.flat() : board.flat().reverse());
  }, [board, turn]);

  const getXYPosition = (index) => {
    const x = turn === "w" ? index % 8 : Math.abs((index % 8) - 7);
    const y =
      turn === "w"
        ? Math.abs(Math.floor(index / 8) - 7)
        : Math.floor(index / 8);
    return { x, y };
  };

  const getChessNotation = (index) => {
    const { x, y } = getXYPosition(index);
    const letter = ["a", "b", "c", "d", "e", "f", "g", "h"][x];
    return `${letter}${y + 1}`;
  };

  const getSquareColor = (index) => {
    const { x, y } = getXYPosition(index);
    return (x + y) % 2 === 1 ? "square-white" : "square-black";
  };

  return (
    <div className="board">
      {currentBoard.flat().map((piece, index) => (
        <div key={index} className="square">
          <BoardSquare
            piece={piece}
            squareColor={getSquareColor(index)}
            position={getChessNotation(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default Board;
