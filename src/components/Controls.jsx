// ─── Controls ────────────────────────────────────────────────────────────────
// Restart and Undo buttons. Manual feature (no AI used).

import { RotateCcw, Undo2 } from 'lucide-react';

export default function Controls({ onReset, onUndo, canUndo }) {
  return (
    <div className="controls">
      <button className="btn btn--undo" onClick={onUndo} disabled={!canUndo} aria-label="Undo last move">
        <Undo2 size={16} />
        Undo
      </button>
      <button className="btn btn--reset" onClick={onReset} aria-label="Restart game">
        <RotateCcw size={16} />
        Restart
      </button>
    </div>
  );
}
