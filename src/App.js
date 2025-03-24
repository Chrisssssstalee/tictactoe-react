import { useState } from 'react';
import React from 'react';
//💗

// Creates a square component that can be clicked to change its value
function Square({value, onSquareClick}) {
  return (
    // When the button is clicked, it calls the onSquareClick function passed as a prop
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Creates board
export default function Board() {
  // State to track whoes turn it is
  const [heartIsNext, setHeartIsNext] = useState(true);

  // State that holds the values of the squares
  const [squares, setSquares] = useState(Array(9).fill(null));
  const winner = calculateWinner(squares);
  let status;  

  // Function to handle the click event on a square
  function handleClick(i) {
    // If the square is already filled or there is a winner, do nothing
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    // Creates copy of squares
    const nextSquares = squares.slice();

    if (heartIsNext) {
      nextSquares[i] = "💗";
    } else {
      nextSquares[i] = "💔";
    }
    setSquares(nextSquares);  // updates squares states
    setHeartIsNext(!heartIsNext);  // toggles turn
  }

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (heartIsNext ? "💗" : "💔");
  }
  
  function resetBoard() {
    setSquares(Array(9).fill(null));
    setHeartIsNext(true);
  }

  return (
    <>
      <div className="status">{status}</div>

      <button type="button" onClick={resetBoard}>Reset</button>

      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// Calculates winner by checking winning combos
function calculateWinner(squares) {
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

  // Loops through winning combos
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
