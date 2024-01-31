import React from 'react';
import { Link } from 'react-router-dom';


function HelpPage({ onClose }) {
    return (
        <div>
    
          {/* Contenido de la página de ayuda */}
            <header>
                <h1>Guia de cómo usar la página</h1>
            </header>

            <main style={{ textAlign: 'left', margin: '20px' }}>
              <section>
                  <h2> Barra Superior: </h2>
                  <div className='help-characteristics'>
                    <p> Se cuenta con un enlace a la actual página de ayuda y a la página de referencia que presenta conceptos y caracteristicas 
                        principales de cada sección: Backtracking y Complejidad Temporal.</p>
                  </div>
              </section>

              <section>
                <h2> Menú Principal: </h2>
                <div className='help-characteristics'>
                  <p> Hay un botón por cada sección, dentro de cada una de ellas se podran encontrar las funciones correspondientes.</p>
                </div>
                
                <h2 style={{ marginLeft: '30px' }}> Sección Backtracking </h2>
                <div className='help-characteristics'style={{ marginLeft: '30px' }}>
                  <p>• Hay un selector para elegir el algoritmo (actualmente Suma de Subconjuntos y N-Reinas).</p>
                  <p>• De acuerdo a cual se eligió aparecen opciones para personalizar la generación del árbol (Binario, N-Ario) o el tipo de resolución (con o sin Poda).</p>
                  <p>• En todos los casos aparece la carga de parametros adecuada según el problema.</p>
                  <p>• Al dar en el boton ejecutar aparece el gráfico del espacio de soluciones al problema indicado junto a unas métricas de rendimiento y la opción de reiniciar para volver al menú principal.</p>
                  <p>• En el panel de visualización se puede manipular el zoom o incluso clickear en un nodo para ocultar/mostrar todos sus ramas inferiores.</p>
                  <p>• Para el algoritmo de N-Reinas (hasta 6) hay un botón para ver las soluciones dentro de un tablero de ajedrez.</p>
                </div>

                <h2 style={{ marginLeft: '30px' }}> Sección Complejidad Temporal </h2>
                <div className='help-characteristics'style={{ marginLeft: '30px' }}>
                  <p>• Hay un selector para elegir el algoritmo (actualmente solo está disponible N-Reinas).</p>
                  <p>• Se solicita cargar los tamaños de las entradas o cantidades de reinas.</p>
                  <p>• Despues de ejecutar se puede observar el gráfico lineal de la complejidad temporal para el problema en cuestión.</p>
                  <p>• En este gráfico se puede ocultar/mostrar las líneas si así se desea.</p>
                </div>
              </section>

              <section>
                <h2> Tips: </h2>
                <div className='help-characteristics'>
                    <p>• Presionar en "BACK SOLUTION" dirige al menú principal.</p>
                    <p>• Siempre que sea necesario ingresar parámetros, hacerlo separando los valores por coma (',').</p>
                </div>
              </section>
          </main>

          <footer style={{paddingTop: '100px', textAlign: 'center' }}>
              <p>Aplicación desarrollada por Joaquín Barbieri y Mauro Luque</p>
          </footer>
        </div>
    );
}

export default HelpPage;
