import * as Chess from "chess.js";
import { BehaviorSubject } from "rxjs";

const chess = new Chess();

export const gameSubject = new BehaviorSubject();

export const initGame = () => {
  updateGame();
};

export const handleMove = (from, to) => {
  const promotion = chess
    .moves({ verbose: true })
    .filter((move) => move.promotion);
  if (
    promotion.some((promo) => `${promo.from}:${promo.to}` === `${from}:${to}`)
  ) {
    const pendingPromotion = { from, to, color: promotion[0].color };
    updateGame(pendingPromotion);
  }
  const { pendingPromotion } = gameSubject.getValue();
  !pendingPromotion && move(from, to);
};

export const move = (from, to, promotion) => {
  let tempMove = { from, to };
  if (promotion) {
    tempMove.promotion = promotion;
  }
  const legalMove = chess.move(tempMove);
  legalMove && updateGame();
};

const updateGame = (pendingPromotion) => {
  const isGameOver = chess.game_over();
  const newGame = {
    board: chess.board(),
    pendingPromotion,
    isGameOver,
    result: isGameOver ? getGameResults() : null,
  };
  gameSubject.next(newGame);
};

const getGameResults = () => {
  if (chess.in_checkmate()) {
    const winner = chess.turn() === "w" ? "BLACK" : "WHITE";
    return `CHECKMATE - WINNER - ${winner}`;
  } else if (chess.in_draw()) {
    let reason = "50 - MOVES RULE";
    if (chess.in_stalemate()) {
      reason = "STEALMATE";
    } else if (chess.in_threefold_repetition()) {
      reason = "REPETITION";
    } else if (chess.insufficient_material()) {
      reason = "INSUFFICIENT MATERIAL";
    }
    return `DRAW - ${reason}`;
  } else {
    return `UNKNOWN REASON`;
  }
};

export const resetGame = () => {
  chess.reset();
  updateGame();
};
