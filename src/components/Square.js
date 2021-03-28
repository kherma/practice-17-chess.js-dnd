import React from "react";

const Square = ({ children, squareColor }) => {
  return <div className={`${squareColor} square-board`}>{children}</div>;
};

export default Square;
