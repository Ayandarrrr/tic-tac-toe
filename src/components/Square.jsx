// ─── Square ──────────────────────────────────────────────────────────────────
// A single cell on the board. "Dumb" — just renders and calls onClick.

import { X, Circle } from 'lucide-react';

export default function Square({ value, onClick, isWinning, isDisabled }) {
  const base = 'square';
  const classes = [
    base,
    value === 'X' ? 'square--x' : value === 'O' ? 'square--o' : '',
    isWinning ? 'square--winning' : '',
    isDisabled ? 'square--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} onClick={onClick} disabled={isDisabled} aria-label={value ?? 'empty cell'}>
      {value === 'X' && <X size={40} strokeWidth={3} />}
      {value === 'O' && <Circle size={38} strokeWidth={3} />}
    </button>
  );
}
