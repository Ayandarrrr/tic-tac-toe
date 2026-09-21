// ─── MoveHistory ─────────────────────────────────────────────────────────────
// Lists every move. Click any entry to time-travel to that board state.

import { Clock, Flag } from 'lucide-react';

export default function MoveHistory({ history, currentStep, onTravelTo }) {
  return (
    <div className="history">
      <h3 className="history__title">
        <Clock size={16} />
        Move History
      </h3>
      <ul className="history__list">
        {history.map((_, step) => {
          const isActive = step === currentStep;
          const label = step === 0 ? 'Game start' : `Move #${step} — ${step % 2 !== 0 ? 'X' : 'O'} played`;

          return (
            <li key={step}>
              <button
                className={`history__btn ${isActive ? 'history__btn--active' : ''}`}
                onClick={() => onTravelTo(step)}
                aria-current={isActive ? 'step' : undefined}
              >
                {step === 0 ? <Flag size={13} /> : <span className="history__move-num">{step}</span>}
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
