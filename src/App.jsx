import { useEffect, useState } from 'react';
import { useGame } from './hooks/useGame';
import Board from './components/Board';
import StatusBar from './components/StatusBar';
import Scoreboard from './components/Scoreboard';
import Controls from './components/Controls';
import MoveHistory from './components/MoveHistory';
import PlayerSetup from './components/PlayerSetup';
import Leaderboard from './components/Leaderboard';
import './App.css';

const savedLeaderboard = JSON.parse(localStorage.getItem('tic-tac-toe-leaderboard') || '{}');

export default function App() {
  const {
    board,
    currentPlayer,
    winner,
    winningLine,
    isDraw,
    scores,
    history,
    step,
    makeMove,
    reset,
    undo,
    travelTo,
  } = useGame();
  const [names, setNames] = useState({ X: 'Player X', O: 'Player O' });
  const [leaderboard, setLeaderboard] = useState(savedLeaderboard);

  const gameOver = !!winner || isDraw;

  useEffect(() => {
    if (!winner) return;
    const name = names[winner].trim() || `Player ${winner}`;
    setLeaderboard((current) => {
      const updated = { ...current, [name]: (current[name] || 0) + 1 };
      localStorage.setItem('tic-tac-toe-leaderboard', JSON.stringify(updated));
      return updated;
    });
  }, [winner]);

  const leaderboardEntries = Object.entries(leaderboard)
    .map(([name, wins]) => ({ name, wins }))
    .sort((a, b) => b.wins - a.wins || a.name.localeCompare(b.name));

  function updateName(player, name) {
    setNames((current) => ({ ...current, [player]: name }));
  }

  return (
    <div className="app">
      <div className="flower-field" aria-hidden="true">
        <span className="flower flower--one" />
        <span className="flower flower--two" />
        <span className="flower flower--three" />
        <span className="flower flower--four" />
      </div>
      <header className="app__header">
        <h1 className="app__title">Tic Tac Toe</h1>
      </header>

      <main className="app__main">
        <aside className="app__aside">
          <PlayerSetup names={names} onChange={updateName} />
          <MoveHistory history={history} currentStep={step} onTravelTo={travelTo} />
          <Leaderboard entries={leaderboardEntries} />
        </aside>

        <section className="app__game">
          <Scoreboard scores={scores} names={names} />
          <StatusBar winner={winner} winnerName={winner ? names[winner] : null} isDraw={isDraw} currentPlayer={currentPlayer} currentPlayerName={names[currentPlayer]} />
          <Board board={board} winningLine={winningLine} onMove={makeMove} gameOver={gameOver} />
          <Controls onReset={reset} onUndo={undo} canUndo={step > 0 && !gameOver} />
        </section>
      </main>
    </div>
  );
}
