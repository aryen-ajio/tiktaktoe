import { useState } from "react";
import Board from './components/Board';

const calculateWinner = (squares) => {

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

const App = () => {

  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    }
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    const tempHistory = history.slice(0, stepNumber + 1);
    const current = tempHistory[tempHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
        return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(prevState => [...prevState, {squares: squares}])
    setStepNumber(history.length)
    setXIsNext(xIsNext => !xIsNext);
  }

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }

  const tempHistory = history;
  const current = tempHistory[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = tempHistory.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move} className="mb-1">
        <button className="text-white bg-blue-500 p-2 border border-blue-600 rounded" onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = <p>Winner: {winner === "x" ? <span className="text-blue-500 font-bold">X</span> : <span className="text-red-500 font-bold">O</span>}</p>;
  } else {
    status = <p>Next player: {xIsNext ? <span className="text-blue-500 font-bold">X</span> : <span className="text-red-500 font-bold">O</span>}</p>;
  }

  return (
    <div className="game">
      <div className="flex">
        <div className="game-board">
          <Board
            squares={current}
            onClick={(i) => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="mb-2">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
}

export default App;
