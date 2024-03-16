/*
Algoritmo Suma de Subconjuntos: Puede generar el arbol de manera n-aria utilizando la poda, en caso de ser arbol 
bianrio puede ser con o sin poda.  

*/

import React, { useState } from 'react'; 


// Función para generar el árbol de espacio de soluciones binario sin poda
export const generateTreeDataSinPoda = (currentSum, targetSum, numbers, currentIndex, path = [], setPrunedNodes, setSolutionNodes, nodeCountObj) => {
    if (currentSum === targetSum) {
      // Si la suma actual es igual al objetivo, es una solución
      setSolutionNodes(prevSolutionNodes => prevSolutionNodes + 1);
      return [
        {
          name: `SOLUCION`,
          attributes: {
            Subconjunto: path.join(', '),
            Suma: targetSum,
            Orden: nodeCountObj.value++,
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
      nodeCountObj
    );

    const excludeChild = generateTreeDataSinPoda(
      currentSum,
      targetSum,
      numbers,
      currentIndex + 1,
      path,
      setPrunedNodes, 
      setSolutionNodes,
      nodeCountObj
    );

    // Retorno para nodos de transición
    return [
      {
        name: `(${path.join(', ')})`,
        attributes: {
          Orden: nodeCountObj.value++,
        },
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

  // Función para generar el árbol de espacio de soluciones binario con poda incluida, agregado el numero de orden decreciente
  export const generateTreeData = (currentSum, targetSum, numbers, currentIndex, path = [], setPrunedNodes, setSolutionNodes, nodeCountObj) => {
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
              Orden: nodeCountObj.value++,
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
      nodeCountObj,
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
      nodeCountObj,
      );

      //Retorno para nodos de transicion
    return [
      {
        name: `(${path.join(', ')})`,
        attributes: {
                Orden: nodeCountObj.value++,
        },
        children: [...excludeChildren, ...includeChildren],
      },
    ];
  };

  /*
  Funcion que retorna el codigo en c++ para ser mostrado en la ventana emergente de backtracking  
  */
  export const codeSumOfSubsetsNario = () => {
    const code = `
      SUMA DE SUBCONJUNTOS N-ARIO
      BACK (estado e, solucion *sol) =====> e: nodo del árbol del espacio de soluciones
                                     =====> sol: solución que retorna
      if ( HOJA (e))
        CalcularSolucion (e, sol);
      else
        int nrohijo = 1;
        estado siguiente;
        while ( HIJOS (nrohijo, e, siguiente ) )
          if ( !PODADO ( siguiente, sol) )
            BACK ( siguiente, sol);
          ++nrohijo; 
    `;
    return code;
  }
  export const codeSumOfSubsetsBinarioPoda = () => {
    const code = `
      SUMA DE SUBCONJUNTOS BINARIO CON PODA
      BACK (estado e, solucion *sol) =====> e: nodo del árbol del espacio de soluciones
                                     =====> sol: solución que retorna
      if ( HOJA (e))
        CalcularSolucion (e, sol);
      else
        int nrohijo = 1;
        estado siguiente;
        while ( HIJOS (nrohijo, e, siguiente ) )
          if ( !PODADO ( siguiente, sol) )
            BACK ( siguiente, sol);
          ++nrohijo; 
    `;
    return code;
  }

  export const codeSumOfSubsetsBinario = () => {
    const code = `
      SUMA DE SUBCONJUNTOS BINARIO SIN PODA
      BACK (estado e, solucion *sol) =====> e: nodo del árbol del espacio de soluciones
                                     =====> sol: solución que retorna
      if ( HOJA (e))
        CalcularSolucion (e, sol);
      else
        int nrohijo = 1;
        estado siguiente;
        while ( HIJOS (nrohijo, e, siguiente ) )
          if ( !PODADO ( siguiente, sol) )
            BACK ( siguiente, sol);
          ++nrohijo; 
    `;
    return code;
  }