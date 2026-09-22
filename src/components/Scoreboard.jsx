// ─── Scoreboard ──────────────────────────────────────────────────────────────
// Tracks X wins, O wins, and draws across rounds.

import { X, Circle, Handshake } from 'lucide-react';

export default function Scoreboard({ scores, names }) {
  return (
    <div className="scoreboard">
      <div className="score-item score-item--x">
        <X size={18} strokeWidth={3} />
        <span className="score-label">{names.X}</span>
        <span className="score-value">{scores.X}</span>
      </div>
      <div className="score-item score-item--draw">
        <Handshake size={18} />
        <span className="score-label">Draws</span>
        <span className="score-value">{scores.draws}</span>
      </div>
      <div className="score-item score-item--o">
        <Circle size={18} strokeWidth={3} />
        <span className="score-label">{names.O}</span>
        <span className="score-value">{scores.O}</span>
      </div>
    </div>
  );
}
