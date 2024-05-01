/*
Algoritmo Suma de Subconjuntos: Puede generar el arbol de manera n-aria utilizando la poda, en caso de ser arbol 
bianrio puede ser con o sin poda.  

*/

import React, { useState } from 'react'; 


// Función para generar el árbol de espacio de soluciones binario sin poda
export const generateTreeDataSinPoda = (currentSum, targetSum, numbers, currentIndex, path = [], setPrunedNodes, setSolutionNodes) => {
    if (currentSum === targetSum) {
      // Si la suma actual es igual al objetivo, es una solución
      setSolutionNodes(prevSolutionNodes => prevSolutionNodes + 1);
      return [
        {
          name: `SOLUCION`,
          attributes: {
            Subconjunto: path.join(', '),
            Suma: targetSum,
          },
        },
      ];
    }  
    if (currentIndex > numbers.length) {
      return [];
    }

    const currentNumber = numbers[currentIndex];
    const includePath = [...path, currentNumber];
    const includeChild = generateTreeDataSinPoda(
      currentSum + currentNumber,
      targetSum,
      numbers,
      currentIndex + 1,
      includePath,
      setPrunedNodes, 
      setSolutionNodes,
    );

    const excludeChild = generateTreeDataSinPoda(
      currentSum,
      targetSum,
      numbers,
      currentIndex + 1,
      path,
      setPrunedNodes, 
      setSolutionNodes,
    );

    // Retorno para nodos de transición
    return [
      {
        name: `(${path.join(', ')})`,
        children: [...excludeChild, ...includeChild],
      },
    ];
  };

  //Arbol para generar el espacio de solucion n-ario con poda incluida
  export const generateTreeDatanario = (currentSum, targetSum, numbers, currentIndex, path = [], setPrunedNodes, setSolutionNodes) => {
    if (currentSum === targetSum) {
      setSolutionNodes(prevSolutionNodes => prevSolutionNodes + 1);
      return [
        {
          name: `SOLUCION`,
          attributes: { 
            Subconjunto: path.join(', '), 
            Suma: targetSum,
          },
        },
      ];
    } 
  
    if (currentIndex > numbers.length || currentSum > targetSum) {
      setPrunedNodes(prevPrunedNodes => prevPrunedNodes + 1);
    }
  
    const currentNumber = numbers[currentIndex];
    const children = [];
  
    // Considera cada número como una posible decisión
    for (let i = currentIndex; i < numbers.length; i++) {
        const includePath = [...path, numbers[i]];
        const includeChild = generateTreeDatanario(
          currentSum + numbers[i],
          targetSum,
          numbers,
          i + 1,
          includePath, 
          setPrunedNodes, 
          setSolutionNodes,
        );
        children.push(...includeChild);
    }
  
    if (currentIndex > numbers.length || currentSum > targetSum) {
      return [];    
    }
    else{
      // Retorno para nodos de transición
      return [
        {
          name: `(${path.join(', ')})`,
          children,
        },
      ];
    }
  };

  export const generateTreeDatanarioSinPoda = (currentSum, targetSum, numbers, currentIndex, path = [], setPrunedNodes, setSolutionNodes) => {
    if (currentSum === targetSum) {
      setSolutionNodes(prevSolutionNodes => prevSolutionNodes + 1);
      return [
        {
          name: `SOLUCION`,
          attributes: { 
            Subconjunto: path.join(', '), 
            Suma: targetSum,
          },
        },
      ];
    } 
  
    const children = [];
  
    // Considera cada número como una posible decisión
    for (let i = currentIndex; i < numbers.length; i++) {
        const includePath = [...path, numbers[i]];
        const includeChild = generateTreeDatanarioSinPoda(
          currentSum + numbers[i],
          targetSum,
          numbers,
          i + 1,
          includePath, 
          setPrunedNodes, 
          setSolutionNodes,
        );
        children.push(...includeChild);
    }

    // Retorno para nodos de transición
    return [
      {
        name: `(${path.join(', ')})`,
        children,
      },
    ];
  };


  // Función para generar el árbol de espacio de soluciones binario con poda incluida
  export const generateTreeData = (currentSum, targetSum, numbers, currentIndex, path = [], setPrunedNodes, setSolutionNodes, nodeCounter = {count: 1}) => {
    if (currentSum === targetSum) {
      setSolutionNodes(prevSolutionNodes => prevSolutionNodes + 1);
      nodeCounter.count++;
      return [{
          name: `SOLUCION`,
          attributes: { 
            Subconjunto: path.join(', '), 
            Suma: targetSum,
          },
        }];
    } 
  
    if (currentIndex >= numbers.length) {
      //setPrunedNodes(prevPrunedNodes => prevPrunedNodes + 1);
      return [];
    }
  
    const currentNumber = numbers[currentIndex];
    const children = [];

    if (currentSum + currentNumber <= targetSum) {
      // Excluye el número actual en el subconjunto
      const excludeChild = generateTreeData(
        currentSum,
        targetSum,
        numbers,
        currentIndex + 1,
        path,
        setPrunedNodes, 
        setSolutionNodes, 
        nodeCounter,
      );
      children.push(...excludeChild);
      // Incluye el número actual en el subconjunto
      const includePath = [...path, currentNumber];
      const includeChild = generateTreeData(
        currentSum + currentNumber,
        targetSum,
        numbers,
        currentIndex + 1,
        includePath, 
        setPrunedNodes, 
        setSolutionNodes,
        nodeCounter,
      );
      children.push(...includeChild);
    }
    // Retorno para nodos de transición
    nodeCounter.count++;
    return [
      {
        name: `(${path.join(', ')})`,
        children,
      }];
  };

  /*
  Funcion que retorna el codigo en c++ para ser mostrado en la ventana emergente de backtracking  
  */
  export const codeSumOfSubsetsNario = () => {
    const code = `
      void SumaSubconjuntos (int W[], int M, int N, int actual, int suma, int* sol, int ind) {
        if (suma == M) {
          mostrarSolucion(sol, n);
        } else {
          while ((actual < N) &&  (suma + W[actual] <= M)){
            sol[ind] = W[actual];      // guardo el valor
            SumaSubconjuntos (W, M, N, actual+1, suma + W[actual], sol, ind+1);
            actual++;
          }
        }
    `;
    return code;
  }

  export const codeSumOfSubsetsNarioSinPoda = () => {
    const code = `
      void SumaSubconjuntos (int W[], int M, int N, int actual, int suma, int* sol, int ind) {
        if (suma == M) {
          mostrarSolucion(sol, n);
        } else {
          while (actual < N){
            sol[ind] = W[actual];      // guardo el valor
            SumaSubconjuntos (W, M, N, actual+1, suma + W[actual], sol, ind+1);
            actual++;
          }
        }
    `;
    return code;
  }

  export const codeSumOfSubsetsBinarioPoda = () => {
    const code = `
      void  SumaSubconjuntosBinario(int W[],int M, int n, int actual, int suma, int* sol) {
        if (suma == M) {
          mostrarSolucion(sol, n);
        } else {
          if ((actual < n)   &&   (suma + W[actual] <= M))  {
            sol[actual] = 1;     // se incluye el elemento actual en la solucion
            SumaSubconjuntosBinario(W, M, n, actual+1, suma + W[actual], sol);
            sol[actual] = 0;     // se excluye el elemento actual de la solucion
            SumaSubconjuntosBinario(W, M, n, actual+1, suma, sol);
          }
        }
      }
    `;
    return code;
  }

  export const codeSumOfSubsetsBinario = () => {
    const code = `
      void  SumaSubconjuntosBinario(int W[],int M, int n, int actual, int suma, int* sol) {
        if (suma == M) {
          mostrarSolucion(sol, n);
        } else {
          if ((actual < n))  {
            // al ser sin poda, no verifica si supera la suma objetivo
            sol[actual] = 1;     // se incluye el elemento actual en la solucion
            SumaSubconjuntosBinario(W, M, n, actual+1, suma + W[actual], sol);
            sol[actual] = 0;     // se excluye el elemento actual de la solucion
            SumaSubconjuntosBinario(W, M, n, actual+1, suma, sol);
          }
        }
      }
    `;
    return code;
  }