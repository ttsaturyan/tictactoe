import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {
  state = {
    squares: Array(9).fill(null),
    xIsNext: true,
    status: "Next player:O",
    isCompleted: false,
  }
  countClick = 0;
  id = 0;

  possibleWinConditions = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ];

  handleClick = (i) => {
    if (this.state.squares[i] === null) {
      this.setState(state => ({
        squares: state.squares.map((square, index) => index === i ? state.xIsNext ? "X" : "O" : square),
        xIsNext: !state.xIsNext,
        status: `Next player:${state.xIsNext ? "X" : "O"}`
      }))
      this.countClick += 1;
      this.player = this.state.xIsNext ? "X" : "O"
    }
    if (this.countClick === 9) {
      this.setState({ status: "draw", isCompleted: true })
    }
  }
  renderSquare = (el, i) => {
    this.id++
    return <Square key={this.id} value={this.state.squares[i]} disabled={this.state.isCompleted} onClick={() => this.handleClick(i)} />;
  }
  resultGame = (player) => {
    const { squares } = this.state
    for (let i = 0; i < this.possibleWinConditions.length; i++) {
      const j = this.possibleWinConditions[i]
      if (
        squares[j[0]] === player &&
        squares[j[1]] === player &&
        squares[j[2]] === player) {
        localStorage.setItem(player, +localStorage.getItem(player) + 1);
        this.setState({ status: "Winner:" + player, isCompleted: true });
        this.countClick = 0;
      }
    }
  }

  handleClickRestart = () => {
    this.setState({
      squares: Array(9).fill(null),
      value: null,
      xIsNext: true,
      status: "Next player:O",
      isCompleted: false,
    })
    this.disabled = false;
    this.countClick = 0;
  }

  handleClickRemoveCount = () => {
    localStorage.setItem('X', 0);
    localStorage.setItem('O', 0);
    this.handleClickRestart()
  }

  componentDidUpdate() {
    if (this.countClick > 4) {
      this.resultGame(this.player)
    }
  }

  render() {
    const { squares, status } = this.state
    return <div className="container">
      <h3>Count X:{localStorage.getItem('X')}</h3>
      <h3>Count O:{localStorage.getItem('O')}</h3>
      <button onClick={this.handleClickRemoveCount}>REMOVE COUNT</button>
      <p>{status} </p>
      {/* use loop */}
      <div className="square">
        {squares.map((el, i) => {
          return this.renderSquare(el, i)
        })}
      </div><br />
      <button onClick={this.handleClickRestart}>RESTART</button>
    </div>
  }
}

export default Board