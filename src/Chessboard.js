import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChessQueen } from "@fortawesome/free-solid-svg-icons";


const Chessboard = ({ size, queens }) => {
  const [board, setBoard] = useState(generateEmptyBoard(size));

  // Función para generar un tablero vacío
  function generateEmptyBoard(size) {
    return Array.from({ length: size }, () => Array(size).fill(null));
  }

  // Función para colocar las reinas en el tablero
  function placeQueens(queens) {
    const newBoard = generateEmptyBoard(size);

    queens.forEach((queen, row) => {
      newBoard[row][queen-1] = 'Q';
    });

    setBoard(newBoard);
  }

  // Llamar a la función para colocar las reinas cuando el componente se monta
  React.useEffect(() => {
    placeQueens(queens);
  }, [queens]);

  return (
    <div style={{ border: '1px solid #000', display: 'inline-block', fontSize: '24px' }}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: (rowIndex + colIndex) % 2 === 0 ? '#fc0' : '#730',
                color: cell === 'Q' ? 'black' : 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #000', // Agregar borde a cada celda
              }}
            >
              {cell === 'Q' && <FontAwesomeIcon icon={faChessQueen} style={{ fontSize: '0.8em', width: '75%', height: '75%' }} />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Chessboard;
