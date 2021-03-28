import React from "react";
import Square from "./Square";
import Piece from "./Piece";
import { useDrop } from "react-dnd";
import { move } from "../Game";

const BoardSquare = ({ piece, squareColor, position }) => {
  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      const [fromPosition] = item.id.split("_");
      move(fromPosition, position);
    },
  });
  return (
    <div className="square-board" ref={drop}>
      <Square squareColor={squareColor}>
        {piece && <Piece piece={piece} position={position} />}
      </Square>
    </div>
  );
};

export default BoardSquare;
