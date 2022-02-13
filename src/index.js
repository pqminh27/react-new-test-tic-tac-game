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
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xNext: true,
    };
  }
  handleClick(i) {
    const new_squares = this.state.squares.slice(); //this still work if we do not create a new array and copy all elements from the old to the new one but warning to not mutate state directly (It is a problem when we need to use lifecycle methods and we compare the next state and previous state of the squares, it will give return us the same result as we mutated the original state)
    //setState is necessary to cause a re-render
    new_squares[i] = this.state.xNext ? "X" : "O";
    this.setState({
      squares: new_squares,
      xNext: !this.state.xNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = "Next player: " + (this.state.xNext ? "X" : "O");

    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

ReactDOM.render(<Game />, document.getElementById("root"));
