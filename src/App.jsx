import { useGame } from './hooks/useGame';
import Board from './components/Board';
import StatusBar from './components/StatusBar';
import Scoreboard from './components/Scoreboard';
import Controls from './components/Controls';
import MoveHistory from './components/MoveHistory';
import './App.css';

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

  const gameOver = !!winner || isDraw;

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Tic Tac Toe</h1>
      </header>

      <main className="app__main">
        <aside className="app__aside">
          <MoveHistory history={history} currentStep={step} onTravelTo={travelTo} />
        </aside>

        <section className="app__game">
          <Scoreboard scores={scores} />
          <StatusBar winner={winner} isDraw={isDraw} currentPlayer={currentPlayer} />
          <Board board={board} winningLine={winningLine} onMove={makeMove} gameOver={gameOver} />
          <Controls onReset={reset} onUndo={undo} canUndo={step > 0 && !gameOver} />
        </section>
      </main>
    </div>
  );
}
