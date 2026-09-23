// ─── Game Reducer ────────────────────────────────────────────────────────────
// Manages: board, currentPlayer, winner, isDraw, history, scores, step

export const ACTIONS = {
  MAKE_MOVE: 'MAKE_MOVE',
  RESET: 'RESET',
  UNDO: 'UNDO',
  TIME_TRAVEL: 'TIME_TRAVEL',
  SET_COMPUTER_MODE: 'SET_COMPUTER_MODE',
};

const WINNING_LINES = [
  [0, 1, 2], // rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonals
  [2, 4, 6],
];

export function calculateWinner(board) {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  return null;
}

export function calculateDraw(board) {
  return board.every((cell) => cell !== null) && !calculateWinner(board);
}

function minimax(board, maximizing) {
  const result = calculateWinner(board);
  if (result?.winner === 'O') return 10;
  if (result?.winner === 'X') return -10;
  if (calculateDraw(board)) return 0;

  const scores = board.reduce((best, cell, index) => {
    if (cell) return best;
    const next = board.slice();
    next[index] = maximizing ? 'O' : 'X';
    const score = minimax(next, !maximizing);
    return maximizing ? Math.max(best, score) : Math.min(best, score);
  }, maximizing ? -Infinity : Infinity);

  return scores + (maximizing ? 0 : 0);
}

export function chooseComputerMove(board) {
  let bestScore = -Infinity;
  let bestMove = null;

  board.forEach((cell, index) => {
    if (cell) return;
    const next = board.slice();
    next[index] = 'O';
    const score = minimax(next, false);
    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  });

  return bestMove;
}

const emptyBoard = Array(9).fill(null);

export const initialState = {
  // history is an array of board snapshots; index 0 = start
  history: [emptyBoard],
  // current step index into history
  step: 0,
  // which player moves next at each step
  players: ['X'], // players[step] = who moved at that step; length grows with moves
  startingPlayer: 'X',
  currentPlayer: 'X',
  winner: null,
  winningLine: [],
  isDraw: false,
  computerEnabled: false,
  scores: { X: 0, O: 0, draws: 0 },
};

export function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_MOVE: {
      const { index } = action.payload;
      const current = state.history[state.step];

      // Ignore if cell taken or game over
      if (current[index] || state.winner || state.isDraw || (state.computerEnabled && state.currentPlayer === 'O' && !action.payload.computer)) return state;

      const newBoard = current.slice();
      newBoard[index] = state.currentPlayer;

      const result = calculateWinner(newBoard);
      const draw = !result && calculateDraw(newBoard);

      // Trim any future history (if user time-travelled back)
      const newHistory = state.history.slice(0, state.step + 1).concat([newBoard]);
      const newStep = state.step + 1;

      const newScores = { ...state.scores };
      if (result) newScores[result.winner] += 1;
      if (draw) newScores.draws += 1;

      return {
        ...state,
        history: newHistory,
        step: newStep,
        currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
        winner: result ? result.winner : null,
        winningLine: result ? result.line : [],
        isDraw: draw,
        scores: newScores,
      };
    }

    case ACTIONS.UNDO: {
      if (state.step === 0) return state;

      const prevStep = state.step - 1;
      const prevBoard = state.history[prevStep];
      const result = calculateWinner(prevBoard);
      const draw = !result && calculateDraw(prevBoard);

      return {
        ...state,
        step: prevStep,
        currentPlayer: prevStep % 2 === 0
          ? state.startingPlayer
          : state.startingPlayer === 'X' ? 'O' : 'X',
        winner: result ? result.winner : null,
        winningLine: result ? result.line : [],
        isDraw: draw,
      };
    }

    case ACTIONS.TIME_TRAVEL: {
      const { step } = action.payload;
      const targetBoard = state.history[step];
      const result = calculateWinner(targetBoard);
      const draw = !result && calculateDraw(targetBoard);

      return {
        ...state,
        step,
        currentPlayer: step % 2 === 0
          ? state.startingPlayer
          : state.startingPlayer === 'X' ? 'O' : 'X',
        winner: result ? result.winner : null,
        winningLine: result ? result.line : [],
        isDraw: draw,
      };
    }

    case ACTIONS.RESET: {
      const startingPlayer = state.startingPlayer === 'X' ? 'O' : 'X';

      return {
        ...initialState,
        computerEnabled: state.computerEnabled,
        startingPlayer,
        currentPlayer: startingPlayer,
        scores: state.scores, // preserve scores across rounds
      };
    }

    case ACTIONS.SET_COMPUTER_MODE:
      return {
        ...state,
        computerEnabled: action.payload.enabled,
      };

    default:
      return state;
  }
}
