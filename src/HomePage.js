import React from 'react';
import { Link } from 'react-router-dom';
import ReferencePage from './ReferencePage'; // Importa la página de referencia
import HelpPage from './HelpPage'; // Importa la página de ayuda
import { useState } from 'react';
import Tree from 'react-d3-tree';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faPlay } from "@fortawesome/free-solid-svg-icons"; // Reemplaza "faCoffee" con el icono que desees utilizar.
import { generateTreeDataSinPoda, generateTreeDatanario, generateTreeData } from './Algorithms/sumOfSubsets';
import { generateNQueensTree, runNQueensForDifferentSizes } from './Algorithms/nQueens';
import { createExecutionTimeChart } from './TimeComplexity';
import './HomePage.css'; // Agrega los estilos a la pagina de inicio
import Chart from 'chart.js/auto'; //Agregado para el grafico de complejidad temporal


function HomePage() {
    //Referencia
    const [referenceVisible, setReferenceVisible] = useState(false);
    const openReference = () => setReferenceVisible(true);
    const closeReference = () => setReferenceVisible(false);
    const [referenceWindow, setReferenceWindow] = useState(null);
    //Ayuda
    const [helpVisible, setHelpVisible] = useState(false);
    const openHelp = () => setHelpVisible(true);
    const closeHelp = () => setHelpVisible(false);
    const [helpWindow, setHelpWindow] = useState(null);
    //Inicio
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(''); // Estado para la selección de algoritmos
    const algorithms = ['Suma de Subconjuntos', 'N-Reinas']; // Nombres de los algoritmos
    const [selectedResolution, setSelectedResolution] = useState(''); // Estado para la selección de resolución del algoritmo
    const [selectedOption, setSelectedOption] = useState(''); // Estado para la selección de resolución del algoritmo
    const [inputNumbers, setInputNumbers] = useState('');
    const [inputTarget, setInputTarget] = useState('');
    const [initialVisible, setInitialVisible] = useState(true);  //Para seccion de inicio
    const [step0Visible, setStep0Visible] = useState(true);
    const [step1Visible, setStep1Visible] = useState(false);
    const [step2Visible, setStep2Visible] = useState(false);
    const [step3Visible, setStep3Visible] = useState(false);
    const [step4Visible, setStep4Visible] = useState(false); 
    //Arbol
    const [resetVisible, setResetVisible] = useState(false); // Nuevo estado para controlar la visibilidad después de reiniciar
    const [treeVisible, setTreeVisible] = useState(false); // Nuevo estado para controlar la visibilidad del árbol
    const [prunedNodes, setPrunedNodes] = useState(0);   //Estado para conteo de nodos podados
    const [solutionNodes, setSolutionNodes] = useState(0);   //Estado para conteo de nodos solución
    const [treeData, setTreeData] = useState(null); //Ocultar o desocultar el gráfico
    const [executionTime, setExecutionTime] = useState(null); //Tiempo de ejecución

    const [selectedTreeType, setSelectedTreeType] = useState(''); //Usado para elegir entre arbol binario o n-ario

    const [buttonsDisabled, setButtonsDisabled] = useState(false); //Estado para controlar la habilitacion de los botones luego de ejecutar
    const [graphVisible, setGraphVisible] = useState(true); //Esatdo para controlar la visibilidad del grafico de complejidad temporal


        // Función para manejar cambios en la selección del algoritmo
    const handleAlgorithmChange = (event) => {
      setSelectedAlgorithm(event.target.value);

      if (event.target.value === 'Suma de Subconjuntos') {
        setStep1Visible(false); // Oculta la sección de opciones de algoritmo
        setStep2Visible(true); // Muestra opciones de tipo de árbol y resolución
      } else if (event.target.value === 'N-Reinas') {
        setStep1Visible(false); // Oculta la sección de opciones de algoritmo
        setStep3Visible(true); // Muestra sección de carga de parámetros
      }
    };

    const handleOptionChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedOption(selectedValue);
    
      if (selectedValue === 'BACKTRACKING') {
        if (selectedAlgorithm === 'N-Reinas') {
          setStep3Visible(true); // Muestra sección de carga de parámetros
        } else if (selectedAlgorithm === 'Suma de Subconjuntos') {
          setStep2Visible(true); // Muestra opciones de tipo de árbol y resolución
        }
      } else if (selectedValue === 'COMPLEJIDAD_TEMPORAL') {
        setStep3Visible(true); // MODIFICAR LUEGO
      }
    
      setInitialVisible(false);
    };
  
    // Función para manejar cambios en la selección de la resolucion del algoritmo
    const handleResolutionChange = (event) => {
      setSelectedResolution(event.target.value);
      setStep3Visible(true); // Avanza al paso 3
    };
  
    const handleInputChange = (event) => {
      if (event.target.id === 'inputNumbers') {
        setInputNumbers(event.target.value);
      } else if (event.target.id === 'inputTarget') {
        setInputTarget(event.target.value);
      }
    };

     //Agregado para seleccionar el tipo de arbol a generar
     const handleTreeTypeChange = (event) => {
      setSelectedTreeType(event.target.value);
    };

    //Abrir pestaña emergente REFERENCIA
    const openReferencePopup = () => {
      const width = 600;
      const height = 400;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;
      const referenceWindow = window.open('/reference', '_blank', `width=${width},height=${height},left=${left},top=${top}`);
      if (referenceWindow) {
        referenceWindow.focus();
      }
    };
    //Cerrar pestaña emergente REFERENCIA
    const closeReferencePopup = () => {
      if (referenceWindow) {
        referenceWindow.close();
        setReferenceWindow(null);
      }
    }
    //Abrir pestaña emergente AYUDA
      const openHelpPopup = () => {
      const width = 600;
      const height = 400;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;
      const helpWindow = window.open('/help', '_blank', `width=${width},height=${height},left=${left},top=${top}`);
      
      if (helpWindow) {
        helpWindow.focus();
      }
    }
    //Cerrar pestaña emergente AYUDA
    const closeHelpPopup = () => {
      if (helpWindow) {
        helpWindow.close();
        setHelpWindow(null);
      }
    }

    //Funcion que se ejecuta al presionar el boton ejecutar
    const handleExecute = () => {
      //Inicializo metricas
      setSolutionNodes(prevSolutionNodes => 0);
      setPrunedNodes(prevPrunedNodes => 0);

      if (selectedAlgorithm=='Suma de Subconjuntos')
      {
        //const selectedAlgorithm = 'Suma de Subconjuntos'; // Puedes mantener esta lógica si es necesario
        const inputNumbers = document.getElementById('inputNumbers').value;
        const inputTarget = parseFloat(document.getElementById('inputTarget').value);
        
        // Convierte la entrada de números separados por comas en un arreglo
        const numbers = inputNumbers.split(',').map(Number);

        if (selectedOption === 'BACKTRACKING') {
          const start = performance.now(); // Tiempo inicial de ejecución
          let newTreeData;
          if (selectedTreeType === 'generateTreeData') {
            if (selectedResolution === 'Con Poda') {
              newTreeData = generateTreeData(0, inputTarget, numbers, 0, [], setPrunedNodes, setSolutionNodes);
            } else if (selectedResolution === 'Sin Poda') {
              newTreeData = generateTreeDataSinPoda(0, inputTarget, numbers, 0, [], setPrunedNodes, setSolutionNodes);
            }
          } else if (selectedTreeType === 'generateTreeDatanario') {
            if (selectedResolution === 'Con Poda') {
              newTreeData = generateTreeDatanario(0, inputTarget, numbers, 0, [], setPrunedNodes, setSolutionNodes);
            }
          }
          const end = performance.now(); // Tiempo final de ejecución
          const timeTaken = (end - start).toFixed(5); // Tiempo de ejecución en milisegundos
          setExecutionTime(timeTaken);

          setTreeData(newTreeData);
          setTreeVisible(true); // Mostrar el árbol cuando se presiona el botón de ejecutar
          setStep4Visible(true); // Avanza al paso 4
        }
      }
      else if (selectedAlgorithm=='N-Reinas')
      {
        if (selectedOption === 'BACKTRACKING') {
          const inputTarget = parseFloat(document.getElementById('inputTarget').value);
          const start = performance.now(); // Tiempo inicial de ejecución
          let newTreeData;
          const initialBoard = Array.from({ length: inputTarget }, () => Array(inputTarget).fill(0));
          newTreeData = generateNQueensTree(inputTarget, initialBoard, 0, setPrunedNodes, setSolutionNodes);

          const end = performance.now(); // Tiempo final de ejecución
          const timeTaken = (end - start).toFixed(5); // Tiempo de ejecución en milisegundos
          setExecutionTime(timeTaken);

          setTreeData(newTreeData);
          setTreeVisible(true); // Mostrar el árbol cuando se presiona el botón de ejecutar
          setStep4Visible(true); // Avanza al paso 4
        }
        else if (selectedOption === 'COMPLEJIDAD_TEMPORAL'){
          // Destruye el gráfico existente si existe
          const existingChart = Chart.getChart("myChart");
          if (existingChart) {
            existingChart.destroy();
          }

          const inputNumbers = document.getElementById('inputNumbers').value;
          const sizes = inputNumbers.split(',').map(Number);
          const executionTimes = [];
          runNQueensForDifferentSizes(sizes, executionTimes, setPrunedNodes, setSolutionNodes);
          
          //LA PRIMERA VEZ EJECUTO TODO LO QUE SEA Y ANDA BIEN, DESPUES SI RENICIO Y QUIERO EJECUTAR DE NUEVO TIRA ERROR POR EL GETCONTEXT()
          const ctx = document.getElementById('myChart').getContext('2d');
          const chart = createExecutionTimeChart(ctx, sizes, executionTimes);
          setStep4Visible(true);
          setGraphVisible(true);
        }
        else{
          alert('OPCION INCORRECTA');
        }
      }
      setButtonsDisabled(true);
    };

    const handleReset = () => {
      setTreeData(null);
      setTreeVisible(false);
      setGraphVisible(false);
      setPrunedNodes(0);
      setSolutionNodes(0);
      setExecutionTime(null);
      setSelectedAlgorithm('');
      setSelectedResolution('');
      setInputNumbers('');
      setInputTarget('');
      setButtonsDisabled(false);
      setInitialVisible(true);
      setStep0Visible(true);
      setStep1Visible(false);
      setStep2Visible(false);
      setStep3Visible(false);
      setStep4Visible(false);
    };

    return (
    <div>
        {/* Sección de navegación */}
        <div className="top-bar">
          <div className="reference-top-bar">
            <Link to="#" onClick={openReferencePopup} className="nav-link">Referencia</Link>
          </div>
          <div className="help-top-bar">
            <Link to="#" onClick={openHelpPopup} className="nav-link">Ayuda</Link>
          </div>
        </div>


        {/* Contenido de la página principal */}
        
        <header>
            <h1>TITULO PRINCIPAL</h1>
        </header>

        <main>
          {/* Mostrar seccion de inicio */}
          {initialVisible && (
            <section className="initial-section">
              <div className="button-container">
                <button onClick={handleOptionChange} value="BACKTRACKING" disabled={buttonsDisabled}>BACKTRACKING</button>
                <button onClick={handleOptionChange} value="COMPLEJIDAD_TEMPORAL" disabled={buttonsDisabled}>COMPLEJIDAD TEMPORAL</button>
              </div>
            </section>
          )}
          {/* Seleccion del algoritmo*/}
          {!initialVisible && (
            <section>
              <h2>Selecciona un Algoritmo</h2>
              <select value={selectedAlgorithm} onChange={handleAlgorithmChange} disabled={buttonsDisabled}>
                <option value="">Algoritmos</option>
                  {algorithms.map((algorithm, index) => (
                <option key={index} value={algorithm}>
                  {algorithm}
                </option>
                ))}
              </select>

              {/* Mostrar la selección del algoritmo*/}
              {selectedAlgorithm && <p>Has seleccionado: {selectedAlgorithm}</p>}
            </section>
          )}
          
          {/* Seleccion de resolucion*/}
          {step2Visible && (
            <section>
              {/* Agrega los botones de radio para seleccionar el tipo de árbol */}
              <h2>Selecciona el tipo de árbol</h2>
              <label>
                <input
                  type="radio"
                  value="generateTreeData"
                  checked={selectedTreeType === 'generateTreeData'}
                  onChange={handleTreeTypeChange}
                />
                Binario
              </label>
              <label>
                <input
                  type="radio"
                  value="generateTreeDatanario"
                  checked={selectedTreeType === 'generateTreeDatanario'}
                  onChange={handleTreeTypeChange}
                />
                N-ario
              </label>
              <h2>Selecciona el tipo de resolución</h2>
              <label>
                <input
                  type="radio"
                  value="Con Poda"
                  checked={selectedResolution === 'Con Poda'}
                  onChange={handleResolutionChange}
                />
                Con poda
              </label>
              {selectedTreeType === 'generateTreeData' && (
                <>
                  <label>
                    <input
                      type="radio"
                      value="Sin Poda"
                      checked={selectedResolution === 'Sin Poda'}
                      onChange={handleResolutionChange}
                    />
                    Sin poda
                  </label>
                </>
              )}
            </section>
          )}

        {step3Visible && selectedAlgorithm === "Suma de Subconjuntos" &&(
            <section>
              <h2>Carga de parámetros</h2>
            <form>
              <label>
                Conjunto (separa los números por comas):
                <input type="text" id="inputNumbers" />
              </label>
              <br />
              <label>
                Suma Objetivo:
                <input type="text" id="inputTarget" inputMode="numeric" />
              </label>
              <br />
            </form>

            </section>
        )}

        {step3Visible && selectedAlgorithm === "N-Reinas" && selectedOption === "BACKTRACKING" &&(
            <section>
              <h2>Carga de parámetros</h2>
            <form>
              <label>
                Cantidad de Reinas:
                <input type="text" id="inputTarget" inputMode="numeric" />
              </label>
              <br />
            </form>

            </section>
        )}

        {step3Visible && selectedAlgorithm === "N-Reinas" && selectedOption === "COMPLEJIDAD_TEMPORAL" &&(
            <section>
              <h2>Carga de parámetros</h2>
            <form>
              <label>
                Tamaños (separa los números por comas):
                <input type="text" id="inputNumbers" />
              </label>
              <br />
            </form>

            </section>
        )}

        {step3Visible && (
          <section>
            {((selectedAlgorithm && selectedResolution) || (selectedAlgorithm == "N-Reinas")) && (
              <button id="ejecutarBtn" onClick={handleExecute}> <FontAwesomeIcon icon={faPlay} /> Ejecutar </button>
            )}
          </section>
        )}

        {step4Visible && (
          <section>
            {(treeVisible || selectedOption=== "COMPLEJIDAD_TEMPORAL") && (
              <button id="reiniciarBtn" onClick={handleReset}> <FontAwesomeIcon icon={faUndo} /> Reiniciar</button>
            )}
          </section>
        )}

        {step4Visible && (
            <section>
              {treeVisible && (
                  <div className='tree' style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
                  <div className='tree-container'>
                          <Tree data={treeData} 
                              rootNodeClassName="node__root" 
                              branchNodeClassName="node__branch" 
                              leafNodeClassName="node__leaf" 
                              orientation="vertical" 
                              translate={{ x: 300, y: 300 }} 
                          />
                      </div>
                      <p>Nodos Podados: {prunedNodes}</p>
                      <p>Nodos Solucion: {solutionNodes}</p>
                      <p>Tiempo de ejecución: {executionTime} ms</p>
                  </div>
              )}
            </section>
        )}
        <section>
          {graphVisible && (
              <div className='graph' style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
                <div className='graph-container'>
                  <canvas id="myChart" width="700" height="500"></canvas>
                </div>
              </div>   
          )}     
        </section>
      </main>
      
      {referenceVisible && <ReferencePage onClose={closeReference} />}
      {helpVisible && <HelpPage onClose={closeHelp} />}
    </div>
  );
}

export default HomePage;