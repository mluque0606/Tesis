/* 
Script encargado de realizar el grafico de la complejidad temporal. Donde recibe como parametro el arreglo de 
tamaños de entrada y los tiempo de ejecucion correspondientes 
*/
import Chart from 'chart.js/auto';

// Función para calcular el factorial de un número
function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

export function createExecutionTimeChart(ctx1, ctx2, sizes, executionTimes, countNodes) {
  const chartEmpirico = new Chart(ctx1, {
    type: 'line',  // Tipo de gráfico. En este caso, es un gráfico de línea.
    data: {
      labels: sizes,  // Etiquetas en el eje X. En este caso, representan los tamaños de entrada.
      datasets: [
        {
          label: 'Complejidad Temporal Empírica', // Etiqueta para el conjunto de datos.
          data: executionTimes,  // Datos en el eje Y. En este caso, representan los tiempos de ejecución.
          borderColor: 'rgba(75, 192, 192, 1)',  // Color del borde de la línea del gráfico.
          borderWidth: 2,  // Ancho del borde de la línea del gráfico.
          fill: false,  // Determina si se rellena el área bajo la línea (en este caso, no se rellena).
          cubicInterpolationMode: 'monotone', // Usar interpolación cúbica monotónica
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: 'linear',  // Tipo de escala para el eje X (lineal en este caso).
          position: 'bottom',  // Posición del eje X (en la parte inferior).
          title: {
            display: true,
            text: 'Tamaño de Entrada',  // Título del eje X.
          },
        },
        y: {
          type: 'linear',  // Tipo de escala para el eje Y (lineal en este caso).
          position: 'left',  // Posición del eje Y (en el lado izquierdo).
          title: {
            display: true,
            text: 'Tiempo de Ejecución (ms)',  // Título del eje Y.
          },
        },
      },
    },
  });

  // Agregar el valor (0, 0) al principio de los arreglos de datos
  
  const sizesWithZero = [0, ...sizes];
  sizes.unshift(0);
  executionTimes.unshift(0);
  countNodes.unshift(0);

  // Calcular los valores de n!
  const valores = sizesWithZero.map(n => factorial(n));


  const chartTeorico = new Chart(ctx2, {
    type: 'line',  // Tipo de gráfico. En este caso, es un gráfico de línea.
    data: {
      labels: sizesWithZero,  // Etiquetas en el eje X. En este caso, representan los tamaños de entrada.
      datasets: [
        {
          label: 'Complejidad Temporal Teorica (Cota)',
          data: valores,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: false,
          cubicInterpolationMode: 'monotone',
        },
        {
          label: 'Operaciones Elementales Reales',
          data: countNodes,
          borderColor: 'rgba(192, 75, 192, 1)',
          borderWidth: 2,
          fill: false,
          cubicInterpolationMode: 'monotone',
        },
      ]
    },
    options: {
      scales: {
        x: {
          type: 'linear',  // Tipo de escala para el eje X (lineal en este caso).
          position: 'bottom',  // Posición del eje X (en la parte inferior).
          min: 0,
          title: {
            display: true,
            text: 'Tamaño de Entrada',  // Título del eje X.
          },
        },
        y: {
          type: 'linear',  // Tipo de escala para el eje Y (lineal en este caso).
          position: 'left',  // Posición del eje Y (en el lado izquierdo).
          title: {
            display: true,
            text: 'Tiempo de ejecución (n° operaciones elementales)',  // Título del eje Y.
          },
        },
      },
    },
  });
  return [chartEmpirico, chartTeorico];
}