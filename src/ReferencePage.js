import React from 'react';
import { Link } from 'react-router-dom';

import './HomePage.css'; // Agrega esta línea para importar los estilos


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
    return (
        <div>
    
          {/* Contenido de la página de referencia */}
            <header>
                <h1>BACKTRACKING</h1>
            </header>

            <main>
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

            <footer>
                <p>Barbieri, Walter Joaquín</p>
                <p>Luque, Mauro Manuel</p>
            </footer>
        </div>
    );
}

export default ReferencePage;
