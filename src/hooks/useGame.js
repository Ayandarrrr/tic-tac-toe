// ─── useGame hook ─────────────────────────────────────────────────────────────
// Wraps the gameReducer so components stay "dumb" — they just call actions.

import { useReducer } from 'react';
import { gameReducer, initialState, ACTIONS } from '../reducer/gameReducer';

export function useGame() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const board = state.history[state.step];

  function makeMove(index) {
    dispatch({ type: ACTIONS.MAKE_MOVE, payload: { index } });
  }

  function makeComputerMove(index) {
    dispatch({ type: ACTIONS.MAKE_MOVE, payload: { index, computer: true } });
  }

  function setComputerMode(enabled) {
    dispatch({ type: ACTIONS.SET_COMPUTER_MODE, payload: { enabled } });
  }

  function reset() {
    dispatch({ type: ACTIONS.RESET });
  }

  function undo() {
    dispatch({ type: ACTIONS.UNDO });
  }

  function travelTo(step) {
    dispatch({ type: ACTIONS.TIME_TRAVEL, payload: { step } });
  }

  return {
    board,
    currentPlayer: state.currentPlayer,
    computerEnabled: state.computerEnabled,
    winner: state.winner,
    winningLine: state.winningLine,
    isDraw: state.isDraw,
    scores: state.scores,
    history: state.history,
    step: state.step,
    makeMove,
    makeComputerMove,
    setComputerMode,
    reset,
    undo,
    travelTo,
  };
}
