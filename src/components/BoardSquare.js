import React from "react";
import Square from "./Square";
import Piece from "./Piece";

const BoardSquare = ({ piece, squareColor }) => {
  return (
    <div className="square-board">
      <Square squareColor={squareColor}>
        {piece && <Piece piece={piece} />}
      </Square>
    </div>
  );
};

export default BoardSquare;
