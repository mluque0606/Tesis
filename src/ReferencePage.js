import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import './HomePage.css'; // Agrega esta línea para importar los estilos
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Importa los estilos de react-tabs



function CodeSnippet() {
  const code = `
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

  return (
    <pre className="code-snippet">
      <code>{code}</code>
    </pre>
  );
}

function ReferencePage({ onClose }) {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div>
      {/* Contenido de la página de referencia */}
      <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
        <TabList>
          <Tab>Backtracking</Tab>
          <Tab>Complejidad Temporal</Tab>
        </TabList>

        <TabPanel>
          {/* Contenido de la primera pestaña "Backtracking" */}
          <main style={{ textAlign: 'left', margin: '20px' }}>
              <section>
                  <h2> Características del problema: </h2>
                  <div className='reference-characteristics'>
                    <p>
                      <strong>Expresión en Forma de Tupla:</strong> La solución se representa como una tupla (x1, x2, ..., xn), lo que permite explorar diferentes combinaciones de valores.
                    </p>
                    <p>
                      <strong>Función Factible:</strong> Evalúa si una tupla cumple con las restricciones del problema, ayudando a descartar soluciones inviables.
                    </p>
                    <p>
                      <strong>Función Solución:</strong> Determina si una tupla factible es una solución válida para el problema, identificando resultados útiles en la búsqueda.
                    </p>
                    <p>
                      <strong>Optimización:</strong> La técnica puede utilizarse para optimizar o satisfacer objetivos específicos, como minimizar costos o cumplir con restricciones.
                    </p>
                    <p>
                      <strong>Restricciones del problema:</strong> 
                    </p>
                    <p>• Explícitas: describen el dominio de los xi.</p>
                    <p>• Implícitas: describen las relaciones que deben cumplirse entre los xi. Determinan qué tuplas dentro del espacio de soluciones satisfacen la función objetivo.</p>
                  </div>
              </section>

              <section>
                <h2>Características de la técnica:</h2>
                <div className='reference-characteristics'>
                    <p>
                      <strong>1)</strong> Forma cada tupla de manera progresiva.
                    </p>
                    <p>
                      <strong>2)</strong> Verifica si cada xi añadido a la tupla (x1,x2,..,xi) conduce a una solución factible.
                    </p>
                    <p>
                      <strong>3)</strong> Si FACTIBLE (x1,x2,..,xi) = FALSO
                      <p>• Corta la búsqueda</p>
                      <p>• Prueba con otro valor válido de xi</p>
                      <p>• Si no existen valores válidos retrocede</p>
                    </p>
                    <p>
                      <strong>4)</strong> Si FACTIBLE (x1,x2,..,xi) = VERDADERO
                      <p>• Repite el procedimiento para incorporar x i+1 a la tupla</p>
                    </p>
                  </div>
              </section>

              <section>
                <h2>Esquema general:</h2>
                <CodeSnippet />
              </section>

              <section>
                <h2> Ventajas y desventajas: </h2>
                <div className='reference-characteristics'>
                  <p>
                    <strong>Ventaja: </strong>
                  </p>
                  <p>• Si existe solución al problema entonces esta técnica la encuentra.</p>
                  <p>
                    <strong>Desventaja: </strong>
                  </p>
                  <p>• Costo computacional exponencial.</p>
                </div>
              </section>
          </main>

          <footer style={{paddingTop: '100px', textAlign: 'center' }}>
              <p>Cormen, T.; Lieserson, C.; Rivest, R.; Stein, C. Introduction to Algorithms, Fourth Edition. The deMit Press, 2022.</p>
              <p>Horowitz, E.; Sahni, S.; Rajasekaran, S. Computer Algorithms / C++. Silicon Press; 2 edition, 2007.</p>
          </footer>
        </TabPanel>

        <TabPanel>
          {/* Contenido de la segunda pestaña "Complejidad Temporal" */}
          <main style={{ textAlign: 'left', margin: '20px' }}>
              <section>
                  <h2> Definicion: </h2>
                  <div className='reference-characteristics'>
                    <p> La complejidad temporal representa la cantidad de tiempo que un algoritmo tarda en ejecutarse en función del tamaño de la entrada, 
                      este se puede ver afectado principalmente por la cantidad de operaciones básicas ejecutadas por el algoritmo. Ademas, permite comparar 
                      la eficiencia relativa de diferentes algoritmos para resolver un mismo problema</p>
                  </div>
              </section>

              <section>
                <h2> Ventajas </h2>
                <div className='reference-characteristics'>
                  <p>• Evaluacion de eficiencia: Proporciona una métrica objetiva para evaluar la eficiencia de los algoritmos en términos de tiempo.</p>
                  <p>• Comparacion de algoritmos: Facilita la comparación entre algoritmos, ayudando a elegir el más eficiente para una tarea específica.</p>
                  <p>• Prediccion de desempeño: Permite prever cómo se comportará un algoritmo a medida que aumenta el tamaño de la entrada.</p>
                </div>
                <h2> Desventajas </h2>
                <div className='reference-characteristics'>
                  <p>• Simplificacion: La complejidad temporal a menudo simplifica el rendimiento real del algoritmo, ya que no tiene en cuenta factores como la arquitectura de la computadora o la implementación específica.</p>
                  <p>• Dificultad en la medicion precisa: Puede ser difícil medir la complejidad temporal exacta, ya que depende de factores específicos de la implementación y del entorno de ejecución.</p>
                  <p>• Uso de recurso: No tiene en cuenta otros recursos, como el espacio en memoria o el ancho de banda, que también son importantes en ciertos contextos.</p>
                </div>
              </section>
          </main>

          <footer style={{paddingTop: '100px', textAlign: 'center' }}>
              <p>Cormen, T.; Lieserson, C.; Rivest, R.; Stein, C. Introduction to Algorithms, Fourth Edition. The deMit Press, 2022.</p>
              <p>Horowitz, E.; Sahni, S.; Rajasekaran, S. Computer Algorithms / C++. Silicon Press; 2 edition, 2007.</p>
          </footer>

        </TabPanel>
      </Tabs>

      <footer>
        {/* Contenido del pie de página */}
      </footer>
    </div>
  );
}


export default ReferencePage;
