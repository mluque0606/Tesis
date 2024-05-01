/*
Algoritmo N-Reinas: Solo disponible la generacion de arbol n-ario con poda. La representacion del tablero indica en 
que columna va la reina colocada, la fila la indica el nombre del nodo o en todo caso se corresponde con la posicion 
del vector. Se analiza que no haya reinas en la misma fila, columna o diagonal (ambos sentidos).
*/

import React, { useState } from 'react';

export const generateNQueensTree = (n, board, row = 0, setPrunedNodes, setSolutionNodes, tree = [], solutionsSet = new Set(), nodeCounter = {count: 1}) => {
  if (row === n) {
    setSolutionNodes((prevSolutionNodes) => prevSolutionNodes + 1);
    const queensPositions = board.map((row, rowIndex) => row.indexOf(1) + 1);
    return [{
      name: `[${nodeCounter.count++}] ` + 'SOLUCION',
      attributes: {
        'Col': '(' + queensPositions.join(', ') + ')',
      }
    }];
  }

  const currentRow = board[row];
  const children = [];

  const nodeName = row !== 0 ? `Fila ${row}` : undefined;

  //Se hace antes de la recursion para que cree los nodos en preorden
  if (row != 0) {
    tree.push({
      name: `[${nodeCounter.count++}] ` + `Fila ${row}`,
      attributes: {
        'Col': '(' + board.map((row, rowIndex) => row.indexOf(1) + 1).join(', ') + ')  ',
      },
      children,
    });
  } else {
    tree.push({
      name: `[${nodeCounter.count++}] `,
      children,
    });
  }

  let hasSafeChild = false; // Variable para rastrear si hay algún hijo seguro

  for (let col = 0; col < n; col++) {
    if (isSafe(board, row, col)) {
      hasSafeChild = true; // Se encontró un hijo seguro
      currentRow[col] = 1; // Coloca una reina en esta posición
      const child = generateNQueensTree(n, [...board], row + 1, setPrunedNodes, setSolutionNodes, [], solutionsSet, nodeCounter);
      children.push(...child);
      currentRow[col] = 0; // Deshaz la decisión para explorar otras posibilidades
    }
    else{
      setPrunedNodes((prevPrunedNodes) => prevPrunedNodes + 1);
    }
  }

  if (!hasSafeChild) {   // Incrementa solo si no hay hijos seguros
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
      // funcion que indica si hay que podar
      bool poda (int R[], int i) {
        int j=0;
        while ( j < i )  {
          if ( (R[j] == R[i])  or  ((i-j) == abs( R[i]- R[j])) )
            return true;	     //si es misma columna o en diagonal, podo
          j++;
        }
        return false;
      }
        
      void backReinas (int Solucion[], int nroReina) {
        if (nroReina== N) {
          mostrarSolucion(Solucion);
        }else{
          for (int columna = 0; columna < N ; columna ++) {
            Solucion[nroReina] = columna;
            if (!poda(Solucion, nroReina))
              backReinas(Solucion, nroReina+1);
          }
        }
      }
    `;
    return code;
  }
  