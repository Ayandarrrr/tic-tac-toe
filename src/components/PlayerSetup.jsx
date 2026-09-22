import { UserRound } from 'lucide-react';

export default function PlayerSetup({ names, onChange }) {
  return (
    <section className="player-setup" aria-labelledby="player-setup-title">
      <h2 id="player-setup-title"><UserRound size={17} /> Players</h2>
      <label>
        <span className="player-mark player-mark--x">X</span>
        <input
          value={names.X}
          onChange={(event) => onChange('X', event.target.value)}
          placeholder="Player X"
          maxLength={20}
        />
      </label>
      <label>
        <span className="player-mark player-mark--o">O</span>
        <input
          value={names.O}
          onChange={(event) => onChange('O', event.target.value)}
          placeholder="Player O"
          maxLength={20}
        />
      </label>
    </section>
  );
}
