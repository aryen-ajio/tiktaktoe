import { useState } from "react";
import Picker from 'emoji-picker-react';
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
      console.log(squares[a]);
      return squares[a];
    }
  }

  return null;
}

const App = () => {

  const [gameStarted, setGameStarted] = useState(false);
  const [showPicker, setShowPicker] = useState(true);
  const [chosenEmojis, setChosenEmojis] = useState({ p1: null, p2: null });
  console.log(chosenEmojis);
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    }
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject.emoji);
    if (!chosenEmojis.p1) {
      setChosenEmojis({...chosenEmojis, p1: emojiObject});
    } else {
      if (emojiObject.emoji !== chosenEmojis.p1.emoji) {
        setChosenEmojis({...chosenEmojis, p2: emojiObject});
        setShowPicker(false);
      }
    }
  };

  const resetGame = () => {
    setHistory([{squares: Array(9).fill(null)}]);
    setStepNumber(0);
    setXIsNext(true);
  }

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
        <button
          className="text-white bg-blue-500 p-2 border border-blue-600 rounded"
          onClick={() => jumpTo(move)}>
            {desc}
          </button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = <p>Winner: {winner === "X" ? <span className="text-blue-500 font-bold">X 🏆</span> : <span className="text-red-500 font-bold">O 🏆</span>}</p>;
  } else {
    status = <p>Next player: {xIsNext ? <span className="text-blue-500 font-bold">X</span> : <span className="text-red-500 font-bold">O</span>}</p>;
  }

  return (
    <div className="game font-poppins">
      {gameStarted ? (
        <div className="flex">
          <div className="game-board">
            <Board
              squares={current}
              onClick={(i) => handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div className="flex items-start justify-between">
              <h1 className="text-4xl font-bold mr-5">Tiktaktoe</h1>
              <button
                className="text-lg text-white font-bold bg-red-500 px-[10px] py-[3px] border border-red-600 rounded mb-2"
                onClick={resetGame}>
                  ↻
              </button>
            </div>
            <div className="text-lg mb-2">{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start justify-center">
          <div className="flex flex-col items-start justify-between">
            <p>Player 1 emoji: {chosenEmojis.p1 ? `${chosenEmojis.p1.emoji}` : 'No emoji chosen'}</p>
            <p>Player 2 emoji: {chosenEmojis.p2 ? `${chosenEmojis.p2.emoji}` : 'No emoji chosen'}</p>
          </div>
          {showPicker ?
            <Picker
              onEmojiClick={onEmojiClick}
              groupVisibility={{
                recently_used: false,
                smileys_people: false,
                food_drink: false,
                travel_places: false,
                activities: false,
                objects: false,
                symbols: false,
                flags: false,
              }}
            /> :
            null
          }
          <button
            className="text-xl text-white font-bold bg-green-600 px-8 py-4 mt-4 border border-green-700 rounded-xl"
            onClick={() => setGameStarted(true)}>
              Start game
          </button>
        </div>
      )
      }
    </div>
  );
}

export default App;
