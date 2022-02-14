import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value: null,
  //   };
  // }

  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
      {/* this.props.value will cause problem here because we do not have constructor with super() here*/}
    </button>
  );
}

class Board extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     squares: Array(9).fill(),
  //     xNext: true,
  //   };
  // }
  // handleClick(i) {
  //   const history = this.state.history;
  //   const current = history[history.length - 1];
  //   const new_squares = this.state.squares.slice(); //this still work if we do not create a new array and copy all elements from the old to the new one but warning to not mutate state directly (It is a problem when we need to use lifecycle methods and we compare the next state and previous state of the squares, it will give return us the same result as we mutated the original state)
  //   //setState is necessary to cause a re-render

  //   if (findWinner(new_squares) || new_squares[i]) return;

  //   new_squares[i] = this.state.xNext ? "X" : "O";
  //   this.setState({
  //     history: history.concat([
  //       {
  //         squares: new_squares,
  //       },
  //     ]),
  //     //the concat() does not mutate the original array
  //     xNext: !this.state.xNext,
  //   });
  // }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    //const winner = findWinner(this.state.squares);
    return (
      <div>
        {/* <div className="status">{status}</div> */}
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xNext: true,
      steps: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.steps + 1);
    const current = history[history.length - 1];
    const new_squares = current.squares.slice(); //this still work if we do not create a new array and copy all elements from the old to the new one but warning to not mutate state directly (It is a problem when we need to use lifecycle methods and we compare the next state and previous state of the squares, it will give return us the same result as we mutated the original state)
    //setState is necessary to cause a re-render

    if (findWinner(new_squares) || new_squares[i]) return;

    new_squares[i] = this.state.xNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: new_squares,
        },
      ]),
      //the concat() does not mutate the original array
      xNext: !this.state.xNext,
      steps: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      steps: step,
      xNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current_board = history[this.state.steps];
    const winner = findWinner(current_board.squares);
    const deuce = checkDeuce(current_board.squares);

    const moves = history.map((step, move) => {
      //step refers to the current history element value, move refers to the current history element index
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) status = "Winner " + winner;
    else if (deuce) status = "Deuce! No winner here!";
    else status = "Next player: " + (this.state.xNext ? "X" : "O");

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current_board.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function findWinner(squares) {
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
  for (let i = 0; i < lines.length; ++i) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function checkDeuce(squares) {
  let full = true;
  for (let i = 0; i < 9; ++i) {
    if (!squares[i]) return false;
  }
  return full;
}
