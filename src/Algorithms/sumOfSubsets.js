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
  
    if (currentIndex >= numbers.length || currentSum > targetSum) {
      setPrunedNodes(prevPrunedNodes => prevPrunedNodes + 1);
      return [];
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
  
    // También considera no incluir el número actual en el subconjunto
    const excludeChild = generateTreeDatanario(
      currentSum,
      targetSum,
      numbers,
      numbers.length,
      path,
      setPrunedNodes, 
      setSolutionNodes, 
    );
    children.push(...excludeChild);
  
    // Retorno para nodos de transición
    return [
      {
        name: `(${path.join(', ')})`,
        children,
      },
    ];
  };

  // Función para generar el árbol de espacio de soluciones binario con poda incluida
  export const generateTreeData = (currentSum, targetSum, numbers, currentIndex, path = [], setPrunedNodes, setSolutionNodes) => {
    if (currentIndex === numbers.length) {
      // Se ha alcanzado el final del conjunto de números
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
      } else {
        // No es una solución
        setPrunedNodes(prevPrunedNodes => prevPrunedNodes + 1);
        return [];
      }
    }

    const currentNumber = numbers[currentIndex];

    // Incluir el número actual en el subconjunto
    const includePath = [...path, currentNumber];
    const includeChildren = generateTreeData(
      currentSum + currentNumber,
      targetSum,
      numbers,
      currentIndex + 1,
      includePath, 
      setPrunedNodes, 
      setSolutionNodes,
      );

    // Excluir el número actual del subconjunto
    const excludeChildren = generateTreeData(
      currentSum,
      targetSum,
      numbers,
      currentIndex + 1,
      path,
      setPrunedNodes, 
      setSolutionNodes,
      );

      //Retorno para nodos de transicion
    return [
      {
        name: `(${path.join(', ')})`,
        children: [...excludeChildren, ...includeChildren],
      },
    ];
  };

  /*
  Funcion que retorna el codigo en c++ para ser mostrado en la ventana emergente de backtracking  
  */
  export const codeSumOfSubsetsNario = () => {
    const code = `
      void sumaSubconjuntos(vector<int>& conjunto, vector<int>& subconjunto, int index, int n, int target) {
          if (target == 0) {
              generarSolucion(subconjunto);
              return;
          }
      
          // Generar subconjuntos recursivamente
          for (int i = index; i < n; ++i) {
              // Si el elemento actual no excede el objetivo
              if (target - conjunto[i] >= 0) {
                  // Incluir el elemento en el subconjunto
                  subconjunto.push_back(conjunto[i]);
                  sumaSubconjuntos(conjunto, subconjunto, i + 1, n, target - conjunto[i]);
                  // Eliminar el elemento
                  subconjunto.pop_back();
              }
          }
      }
    `;
    return code;
  }
  export const codeSumOfSubsetsBinarioPoda = () => {
    const code = `
      void encontrarSubconjuntos(const vector<int>& conjunto, vector<int>& subset, int target, int index, int currentSum) {
          // Si la suma del subconjunto actual es igual al objetivo, es solución
          if (currentSum == target) {
              generarSolucion(subset);
              return;
          }
      
          // Si se recorrió todo el conjunto o la suma actual supera el objetivo, regreso
          if (index >= conjunto.size() || currentSum > target) {
              return;
          }
      
          // Incluir el elemento actual en el subconjunto
          subset.push_back(conjunto[index]);
          encontrarSubconjuntos(conjunto, subset, target, index + 1, currentSum + conjunto[index]);
      
          // Excluir el elemento actual del subconjunto
          subset.pop_back();
          encontrarSubconjuntos(conjunto, subset, target, index + 1, currentSum);
      }
    `;
    return code;
  }

  export const codeSumOfSubsetsBinario = () => {
    const code = `
      void encontrarSubconjuntos(const vector<int>& conjunto, vector<int>& subset, int target, int index, int currentSum) {
        // Si la suma del subconjunto actual es igual al objetivo, es solución
        if (currentSum == target) {
            generarSolucion(subset);
            return;
        }
    
        // Si se recorrió todo el conjunto, regreso
        if (index >= conjunto.size()) {
            return;
        }
    
        // Incluir el elemento actual en el subconjunto
        subset.push_back(conjunto[index]);
        encontrarSubconjuntos(conjunto, subset, target, index + 1, currentSum + conjunto[index]);
    
        // Excluir el elemento actual del subconjunto
        subset.pop_back();
        encontrarSubconjuntos(conjunto, subset, target, index + 1, currentSum);
  }
    `;
    return code;
  }