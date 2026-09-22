import { Trophy } from 'lucide-react';

export default function Leaderboard({ entries }) {
  return (
    <section className="leaderboard" aria-labelledby="leaderboard-title">
      <h2 id="leaderboard-title"><Trophy size={17} /> Leaderboard</h2>
      {entries.length === 0 ? (
        <p className="leaderboard__empty">Win a round to get on the board.</p>
      ) : (
        <ol className="leaderboard__list">
          {entries.map((entry, index) => (
            <li key={entry.name}>
              <span className="leaderboard__rank">{index + 1}</span>
              <span className="leaderboard__name">{entry.name}</span>
              <strong>{entry.wins}</strong>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
