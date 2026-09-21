// ─── Board ───────────────────────────────────────────────────────────────────
// Renders the 3x3 grid. Passes winning-line info down to each Square.

import Square from './Square';

export default function Board({ board, winningLine, onMove, gameOver }) {
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          isWinning={winningLine.includes(index)}
          isDisabled={!!value || gameOver}
          onClick={() => onMove(index)}
        />
      ))}
    </div>
  );
}
