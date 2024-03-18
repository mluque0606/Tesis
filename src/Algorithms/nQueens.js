/*
Algoritmo N-Reinas: Solo disponible la generacion de arbol n-ario con poda. La representacion del tablero indica en 
que columna va la reina colocada, la fila la indica el nombre del nodo o en todo caso se corresponde con la posicion 
del vector. Se analiza que no haya reinas en la misma fila, columna o diagonal (ambos sentidos).
*/

import React, { useState } from 'react';  // Asegúrate de importar useState si no lo has hecho

export const generateNQueensTree = (n, board, row = 0, setPrunedNodes, setSolutionNodes, tree = [], solutionsSet = new Set(), nodeCounter = {count: 1}) => {
  if (row === n) {
    setSolutionNodes((prevSolutionNodes) => prevSolutionNodes + 1);
    const queensPositions = board.map((row, rowIndex) => row.indexOf(1) + 1);
    return [{
      name: 'SOLUCION',
      attributes: {
        'Columnas': '(' + queensPositions.join(', ') + ')',
        'Orden' : nodeCounter.count++,
      }
    }];
  }

  const currentRow = board[row];
  const children = [];

  const nodeName = row !== 0 ? `Fila ${row}` : undefined;

  //Se hace antes de la recursion para que cree los nodos en preorden
  if (row != 0) {
    tree.push({
      name: `Fila ${row}`,
      attributes: {
        'Columnas': '(' + board.map((row, rowIndex) => row.indexOf(1) + 1).join(', ') + ')  ',
        'Orden': nodeCounter.count++,
      },
      children,
    });
  } else {
    tree.push({
      attributes: {
        'Orden': nodeCounter.count++,
      },
      children,
    });
  }

  for (let col = 0; col < n; col++) {
    if (isSafe(board, row, col)) {
      currentRow[col] = 1; // Coloca una reina en esta posición
      const child = generateNQueensTree(n, [...board], row + 1, setPrunedNodes, setSolutionNodes, [], solutionsSet, nodeCounter);
      children.push(...child);
      currentRow[col] = 0; // Deshaz la decisión para explorar otras posibilidades
    }
  }

  if (children.length === 0) {
    setPrunedNodes((prevPrunedNodes) => prevPrunedNodes + 1);
  }

  return tree;
};


  const isSafe = (board, row, col) => {
    // Verifica la fila actual hacia la izquierda
    for (let i = 0; i < col; i++) {
      if (board[row][i] === 1) {
        return false;
      }
    }
  
    // Verifica la columna actual hacia arriba
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 1) {
        return false;
      }
    }
  
    // Verifica la diagonal superior izquierda hacia arriba
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 1) {
        return false;
      }
    }

    // Verifica la diagonal superior derecha hacia arriba
    for (let i = row, j = col; i >= 0 && j < board.length; i--, j++) {
      if (board[i][j] === 1) {
          return false;
      }
    }
    return true;
  };

  // Función auxiliar para verificar si una solución ya existe en el árbol
  const solutionExists = (tree, currentSolution) => {
    return tree.some(node => node.attributes && node.attributes.Columnas === `(${currentSolution})`);
  };


  /*
  Procedimiento para ejecucion de complejidad temporal en algoritmo de N-Reinas, donde se recibe por parametros
  los tamaños del algoritmo a ejecutar y, se guarda en un arreglo los tiempos de ejecucion devueltos y la cantidad 
  de nodos generados, para luego ser graficado
  */
  export const runNQueensForDifferentSizes = (sizes, executionTimes, countNodes, setPrunedNodes, setSolutionNodes) => {
  
    // Itera a través de diferentes tamaños de entrada
    for (const size of sizes) {
      const initialBoard = Array.from({ length: size }, () => Array(size).fill(0));
      // Inicializar el contador de nodos
      const nodeCounter = { count: 1 };
      const start = performance.now();
      generateNQueensTree(size, initialBoard, 0, setPrunedNodes, setSolutionNodes, [], undefined, nodeCounter);
      const end = performance.now();


      const executionTime = end - start;
      executionTimes.push(executionTime);
      countNodes.push(--nodeCounter.count);
    }
  };

  /*
  Funcion que retorna el codigo en c++ para ser mostrado en la ventana emergente de backtracking
  */
  export const codeNQueens = () => {
    const code = `
      // Función que indica si una posición es segura para colocar la reina
      bool esPosicionSegura(const vector<int> &solucion, int fila, int columna) {
        for (int i = 0; i < fila; ++i)
            if (solucion[i] == columna || solucion[i] - i == columna - fila || solucion[i] + i == columna + fila)
                return false;
        return true;
      }

      void nReinasBacktracking(vector<int> &solucion, int fila, int &numSoluciones) {
          int n = solucion.size();
          // Si es la última fila, generamos una solución
          if (fila == n) {
              generarSolucion(solucion);
              return;
          }
          for (int columna = 0; columna < n; ++columna) {
              if (esPosicionSegura(solucion, fila, columna)) {
                  solucion[fila] = columna;
                  nReinasBacktracking(solucion, fila + 1, numSoluciones);
                  solucion[fila] = -1;
              }
          }
      }
    `;
    return code;
  }
  