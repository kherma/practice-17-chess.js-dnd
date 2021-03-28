import React, { useEffect, useState } from "react";
import Square from "./Square";
import Piece from "./Piece";
import Promote from "./Promote";
import { useDrop } from "react-dnd";
import { handleMove, gameSubject } from "../Game";

const BoardSquare = ({ piece, squareColor, position }) => {
  const [promotion, setPromotion] = useState(null);
  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      const [fromPosition] = item.id.split("_");
      handleMove(fromPosition, position);
    },
  });

  useEffect(() => {
    const subscribe = gameSubject.subscribe(({ pendingPromotion }) =>
      pendingPromotion && pendingPromotion.to === position
        ? setPromotion(pendingPromotion)
        : setPromotion(null)
    );
    return () => subscribe.unsubscribe();
  }, []);
  return (
    <div className="square-board" ref={drop}>
      <Square squareColor={squareColor}>
        {promotion ? (
          <Promote promotion={promotion} />
        ) : (
          piece && <Piece piece={piece} position={position} />
        )}
      </Square>
    </div>
  );
};

export default BoardSquare;
