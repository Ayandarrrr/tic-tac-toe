// ─── StatusBar ───────────────────────────────────────────────────────────────
// Shows "Next Player: X", "Winner: O", or "Draw!"

import { Trophy, Handshake, X, Circle } from 'lucide-react';

export default function StatusBar({ winner, winnerName, isDraw, currentPlayer, currentPlayerName }) {
  if (winner) {
    return (
      <div className="status status--winner">
        <Trophy size={20} />
        <span>Winner: {winnerName || winner}</span>
      </div>
    );
  }

  if (isDraw) {
    return (
      <div className="status status--draw">
        <Handshake size={20} />
        <span>Draw!</span>
      </div>
    );
  }

  return (
    <div className="status status--next">
      {currentPlayer === 'X' ? <X size={18} strokeWidth={3} /> : <Circle size={18} strokeWidth={3} />}
      <span>Next Player: {currentPlayerName || currentPlayer}</span>
    </div>
  );
}
