/*
Algoritmo Suma de Subconjuntos: Puede generar el arbol de manera n-aria utilizando la poda, en caso de ser arbol 
bianrio puede ser con o sin poda.  
EL NUMERO DE ORDEN DE CREACION DE LOS NODOS SOLO ESTA PARA ARBOL BIANRIO CON PODA
*/

import React, { useState } from 'react';  // Asegúrate de importar useState si no lo has hecho


// Función para generar el árbol de espacio de soluciones binario sin poda
export const generateTreeDataSinPoda = (currentSum, targetSum, numbers, currentIndex, path = [], setPrunedNodes, setSolutionNodes) => {
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
    const includePath = [...path, currentNumber];
    const includeChild = generateTreeDataSinPoda(
      currentSum + currentNumber,
      targetSum,
      numbers,
      currentIndex + 1,
      includePath,
      setPrunedNodes, 
      setSolutionNodes
    );

    const excludeChild = generateTreeDataSinPoda(
      currentSum,
      targetSum,
      numbers,
      currentIndex + 1,
      path,
      setPrunedNodes, 
      setSolutionNodes
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
        setSolutionNodes
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
      setSolutionNodes
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
  export const generateTreeData = (currentSum, targetSum, numbers, currentIndex, path = [], setPrunedNodes, setSolutionNodes, nodeOrder) => {
    
    if (currentIndex >= numbers.length || currentSum > targetSum) {
      
      setPrunedNodes(prevPrunedNodes => prevPrunedNodes + 1);     // Actualiza estado de nodos podados 
      return [];
    }
    
    const thisNodeOrder = nodeOrder++; // Obtén el orden actual y luego incrementa el contador

    //Retorno para nodos solucion
    if (currentSum === targetSum) {
      setSolutionNodes(prevSolutionNodes => prevSolutionNodes + 1);     // Actualiza estado de nodos solucion
      return [
        {
          name: `SOLUCIÓN`,
          attributes: { 
            Subconjunto: path.join(', '), 
            Suma: targetSum,
            Orden: thisNodeOrder,
          },
        },
      ];
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
      nodeOrder
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
      nodeOrder
    );

    //Retorno para nodos de transicion
    return [
      {
        name: `(${path.join(', ')})`,
        attributes: { 
          Orden: thisNodeOrder,
        },
        children: [...excludeChildren, ...includeChildren],
      },
    ];
  };