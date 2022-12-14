import React from 'react';
import "./styles.css";

/**
 * From: https://reactjs.org/tutorial/tutorial.html#setup-option-1-write-code-in-the-browser
 * - Display the location for each move in the format (col, row) in the move history list.
 * - Bold the currently selected item in the move list.
 * - Rewrite Board to use two loops to make the squares instead of hardcoding them.
 * - Add a toggle button that lets you sort the moves in either ascending or descending order.
 * - When someone wins, highlight the three squares that caused the win.
 * - When no one wins, display a message about the result being a draw.
 */
function calculateWinner(squares) {
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
}
function Square(props){
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

class Board extends React.Component {

 
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.handleClick(i)} />;
  }

  render() {
    return (
      <div>
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

export default class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0}
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.history.length + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    
    const winner = calculateWinner(squares)
    if (winner || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? "X": "0";
    this.setState({
      history: history.concat([{squares}]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    })

  }

  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status = `Next player: ${this.state.xIsNext ? 'X' : '0'}`;

    if (winner) {
      status = 'Winner: '+ winner;
    }

    const moves = history.map((step, move) => {
      const desc = move ?  
      'Go to move: #' + move :
      'Go to game start';
      return (<li key={move}>
        <button onClick={()=>{ this.jumpTo(move)}}>{desc}</button></li>)
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} handleClick={(i)=> this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

