/* 
Script encargado de realizar el grafico de la complejidad temporal. Donde recibe como parametro el arreglo de 
tamaños de entrada y los tiempo de ejecucion correspondientes 
*/
import Chart from 'chart.js/auto';

export function createExecutionTimeChart(ctx, sizes, executionTimes) {
  return new Chart(ctx, {
    type: 'line',  // Tipo de gráfico. En este caso, es un gráfico de línea.
    data: {
      labels: sizes,  // Etiquetas en el eje X. En este caso, representan los tamaños de entrada.
      datasets: [
        {
          label: 'Complejidad Temporal',  // Etiqueta para el conjunto de datos.
          data: executionTimes,  // Datos en el eje Y. En este caso, representan los tiempos de ejecución.
          borderColor: 'rgba(75, 192, 192, 1)',  // Color del borde de la línea del gráfico.
          borderWidth: 2,  // Ancho del borde de la línea del gráfico.
          fill: false,  // Determina si se rellena el área bajo la línea (en este caso, no se rellena).
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
}