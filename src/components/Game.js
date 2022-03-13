import {useState} from 'react';
import Board from './Board';
import './Game.css';

const square = Array(9).fill(null);

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Game = () => {
  const [history, setHistory] = useState([square]);
  const [xIsNext, setXIsNext] = useState(true);
  const [steps, setSteps] = useState(0);
  const winner = calculateWinner(history[steps]);
  const XorO = xIsNext ? 'X' : 'O';

  const checkDeuce = () => {
    return !winner && steps === 9;
  };

  const handleClick = (index) => {
    const new_history = history.slice(0, steps + 1);
    const current = new_history[steps];
    const squares = [...current];

    if (winner || squares[index]) return;

    squares[index] = XorO;
    setHistory([...new_history, squares]);
    setSteps(new_history.length);
    setXIsNext((prevState) => !prevState);
  };

  const jumpTo = (step) => {
    setSteps(step);
    setXIsNext(step % 2 === 0);
  };

  const moves = history.map((step, move) => {
    const destination = move ? 'Go to move #' + move : 'Go to Start';
    return (
      <li key={move}>
        <button className="button" onClick={() => jumpTo(move)}>
          {destination}
        </button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = 'Winner: ' + winner + '! Congratulation!';
  } else if (checkDeuce()) {
    status = 'Deuce! Start a new game!';
  } else status = 'Next player: ' + XorO;

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={history[steps]} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
