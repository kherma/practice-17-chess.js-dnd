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
  const newGame = { board: chess.board(), pendingPromotion };
  gameSubject.next(newGame);
};
