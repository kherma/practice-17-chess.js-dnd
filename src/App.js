import React, { useEffect, useState } from "react";
import "./App.css";
import { gameSubject, initGame, resetGame } from "./Game";
import Board from "./components/Board";

const App = () => {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState();
  const [result, setResult] = useState();
  const [turn, setTurn] = useState();

  useEffect(() => {
    initGame();
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board);
      setIsGameOver(game.isGameOver);
      setResult(game.result);
      setTurn(game.turn);
    });
    return () => subscribe.unsubscribe();
  }, []);

  return (
    <div className="container">
      {isGameOver && (
        <div className="rg-info-box">
          <h2 className="vertical-text">GAME OVER</h2>
          <button className="btn-new" onClick={resetGame}>
            <span className="vertical-text">NEW GAME</span>
          </button>
        </div>
      )}

      <div className="board-container">
        <Board board={board} turn={turn} />
      </div>

      {result && <p className="vertical-text">{result}</p>}
    </div>
  );
};

export default App;
