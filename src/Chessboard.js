import React, { useState } from 'react';

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
      //newBoard[row][queen-1] = 'D:/Git/Tesis BL/Tesis/src/Images/queen.png';  ACA MANEJAR LA IMAGEN DE REINA A AGREGAR
      newBoard[row][queen-1] = 'Q';
    });

    setBoard(newBoard);
  }

  // Llamar a la función para colocar las reinas cuando el componente se monta
  React.useEffect(() => {
    placeQueens(queens);
  }, [queens]);

  return (
    <div style={{ border: '1px solid #000', display: 'inline-block' }}>
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
              {/* Mostrar la imagen si hay una ruta definida */}
              {cell && <img src={cell} alt="Queen" style={{ width: '100%', height: '100%' }} />}  
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Chessboard;
