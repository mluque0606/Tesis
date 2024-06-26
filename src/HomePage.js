import React from 'react';
import ReactDOM from 'react-dom'; // Asegúrate de importar ReactDOM
import { Link } from 'react-router-dom';
import ReferencePage from './ReferencePage'; // Importa la página de referencia
import HelpPage from './HelpPage'; // Importa la página de ayuda
import { useState } from 'react';
import Tree from 'react-d3-tree';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faPlay, faChessBoard, faCode } from "@fortawesome/free-solid-svg-icons";
import { generateTreeDataSinPoda, generateTreeDatanario, generateTreeDatanarioSinPoda, generateTreeData, codeSumOfSubsetsNario, codeSumOfSubsetsNarioSinPoda, codeSumOfSubsetsBinarioPoda, codeSumOfSubsetsBinario } from './Algorithms/sumOfSubsets';
import { generateNQueensTree, runNQueensForDifferentSizes, codeNQueens } from './Algorithms/nQueens';
import { createExecutionTimeChart } from './TimeComplexity';
import './HomePage.css'; // Agrega los estilos a la pagina de inicio
import Chart from 'chart.js/auto'; //Agregado para el grafico de complejidad temporal
import Chessboard from './Chessboard';
import logo from './Images/Logo.png'; // Importa el logo


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
    const [generatedNodes, setGeneratedNodes] = useState(0);   //Estado para conteo de nodos solución
    const [treeData, setTreeData] = useState(null); //Ocultar o desocultar el gráfico
    const [executionTime, setExecutionTime] = useState(null); //Tiempo de ejecución

    const [selectedTreeType, setSelectedTreeType] = useState(''); //Usado para elegir entre arbol binario o n-ario

    const [buttonsDisabled, setButtonsDisabled] = useState(false); //Estado para controlar la habilitacion de los botones luego de ejecutar
    const [graphVisible, setGraphVisible] = useState(false); //Esatdo para controlar la visibilidad del grafico de complejidad temporal
    const [descriptionVisible, setDescriptionVisible] = useState(false); //Esatdo para controlar la visibilidad de la descripcion del grafico de complejidad
    const [isChessboardVisible, setChessboardVisible] = useState(false); //Estado para controlar la visbilidad del tablero
    const [chessboardWindow, setChessboardWindow] = useState(null);
    const [codeWindow, setCodeWindow] = useState(null);
    const [executeDisabled, setExecuteDisabled] = useState(false); //Estado para controlar la habilitacion del ejecutar en complejidad temporal
    const [nameSection, setNameSection] = useState(''); //Estado para controlar la visibilidad del nombre de la seccion
    const [inputErrorMenor, setInputErrorMenor] = useState(false);  // Estado para validar la entrada en n-reinas
    const [inputErrorMayor, setInputErrorMayor] = useState(false);  // Estado para validar la entrada en n-reinas
    const [inputErrorVacio, setInputErrorVacio] = useState(false);  // Estado para validar la entrada en n-reinas
    const [InputErrorDecimal, setInputErrorDecimal] = useState(false);  // Estado para validar la entrada en n-reinas

    //Esstructura que contiene las soluciones de n-reinas. El indice es el tamaño y el array las soluciones
    const [datos, setDatos] = useState({
      4: [2,4,1,3, 3,1,4,2],
      5: [1,3,5,2,4, 1,4,2,5,3, 2,4,1,3,5, 2,5,3,1,4, 3,1,4,2,5, 3,5,2,4,1, 4,1,3,5,2, 4,2,5,3,1, 5,2,4,1,3, 5,3,1,4,2],
      6: [2,4,6,1,3,5, 3,6,2,5,1,4, 4,1,5,2,6,3, 5,3,1,6,4,2], 
    });


    const queensPositions = [];


    // Función para manejar cambios en la selección del algoritmo
    const handleAlgorithmChange = (event) => {
      setSelectedAlgorithm(event.target.value);
    
      if (event.target.value === 'Suma de Subconjuntos') {
        setStep1Visible(false); // Oculta la sección de opciones de algoritmo
        setStep2Visible(true); // Muestra opciones de tipo de árbol y resolución
        setStep3Visible(false); // Oculta la sección de carga de parámetros para N-Reinas
      } else if (event.target.value === 'N-Reinas') {
        setStep1Visible(false); // Oculta la sección de opciones de algoritmo
        setStep2Visible(false); // Oculta opciones de tipo de árbol y resolución
        setStep3Visible(true); // Muestra sección de carga de parámetros
      }
    };

    const handleOptionChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedOption(selectedValue);
    
      // Restablecer la selección del algoritmo y otros estados relacionados con el algoritmo
      setSelectedAlgorithm('');
      setSelectedTreeType('');
      setSelectedResolution('');
      setInputNumbers('');
      setInputTarget('');
    
      if (selectedValue === 'BACKTRACKING') {
        setNameSection('Backtracking');
        setStep3Visible(true); // Muestra sección de carga de parámetros
      } else if (selectedValue === 'COMPLEJIDAD_TEMPORAL') {
        setNameSection('Complejidad Temporal');
        setStep3Visible(true);
        setGraphVisible(true);
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

    //Agregado para visualizar las soluciones en tablero de ajedrez
    const handleShowChessboardInNewWindow = () => {
      //Busco el centro de la pantalla
      const screen = window.screen;
      const screenWidth = screen.width;
      const screenHeight = screen.height;
      const windowWidth = 400;
      const windowHeight = 400;
      const left = (screenWidth - windowWidth) / 2;
      const top = (screenHeight - windowHeight) / 2;
      const cantReinas = parseFloat(document.getElementById('inputTarget').value);
      
      if ((cantReinas >= 4) && (cantReinas <= 6)) {
        const arreglo = datos[cantReinas];
        const totalTableros = arreglo.length / cantReinas;
      
        // Abre una nueva ventana
        const newWindow = window.open('', '_blank', `width=${windowWidth},height=${windowHeight},left=${left},top=${top}`);
          
        if (newWindow) {
          setChessboardWindow(newWindow);  // Almacena la referencia de la ventana emergente
          newWindow.document.write('<html><head><title>Chessboard</title>');
          newWindow.document.write('<style>');
          newWindow.document.write('body { font-family: "Arial", sans-serif; margin: 20px; background-color: #CEDEBD; color: #435334; overflow: auto;}');
          newWindow.document.write('.chessboard-container { margin: 20px; display: inline-block; float: left; }');
          newWindow.document.write('h1 { text-align: center; }');
          newWindow.document.write('</style></head><body>');
          newWindow.document.write('<h1>Tableros</h1>');
          newWindow.document.write('<p>Cantidad de Reinas: ' + cantReinas + ', Cantidad de Soluciones: ' + totalTableros + '</p>');
          newWindow.document.write('<div id="chessboard-container"></div>');
          newWindow.document.write('</body></html>');
      
          for (let i = 0; i < totalTableros; i++) {
            // Crea un contenedor para cada tablero en la nueva ventana
            newWindow.document.write(`<div class="chessboard-container" id="chessboard-container-${i}"></div>`);
      
            // Obtiene el contenedor recién creado
            const chessboardContainer = newWindow.document.getElementById(`chessboard-container-${i}`);
      
            // Renderiza el tablero en el contenedor
            ReactDOM.render(
              <Chessboard size={cantReinas} queens={arreglo.slice(i * cantReinas, (i + 1) * cantReinas)} />,
              chessboardContainer
            );          
          };
      
          newWindow.document.write('</body></html>');
        }
      }
    };

    //Agregado para visualizar el codigo fuente
    const handleShowCodeInNewWindow = () => {
      //Busco el centro de la pantalla
      const screen = window.screen;
      const screenWidth = screen.width;
      const screenHeight = screen.height;
      const windowWidth = 400;
      const windowHeight = 400;
      const left = (screenWidth - windowWidth) / 2;
      const top = (screenHeight - windowHeight) / 2;
      // Abre una nueva ventana
      const newWindow = window.open('', '_blank', `width=${windowWidth},height=${windowHeight},left=${left},top=${top}`);
      let code;
      let tittle;
      if (selectedAlgorithm === 'N-Reinas'){
        code = codeNQueens();
        tittle = 'N-Reinas';
      }
      else if (selectedAlgorithm === 'Suma de Subconjuntos'){
        if (selectedTreeType === 'generateTreeData'){
          if (selectedResolution === 'Con Poda') {
            code = codeSumOfSubsetsBinarioPoda();
            tittle = 'Suma de Subconjuntos binario con poda';
          }
          else if (selectedResolution === 'Sin Poda'){
            code = codeSumOfSubsetsBinario();
            tittle = 'Suma de Subconjuntos binario sin poda';
          }
        }
        else if (selectedTreeType === 'generateTreeDatanario'){
          if (selectedResolution === 'Con Poda') {
            code = codeSumOfSubsetsNario();
            tittle = 'Suma de Subconjuntos n-ario';
          }
          else if (selectedResolution === 'Sin Poda'){
            code = codeSumOfSubsetsNarioSinPoda();
            tittle = 'Suma de Subconjuntos n-ario sin poda';
          }
        }
      }
      if (newWindow) {
        setCodeWindow(newWindow);  // Almacena la referencia de la ventana emergente
        newWindow.document.write('<html><head><title>Code Window</title>');
        newWindow.document.write('<style>');
        newWindow.document.write('body { font-family: "Arial", sans-serif; margin: 20px; background-color: #CEDEBD; color: #435334; overflow: auto;}');
        newWindow.document.write('h1 { text-align: center; }');
        newWindow.document.write('.code-container { background-color: white; padding: 20px; border-radius: 8px; }'); // Estilo para el contenedor del código
        newWindow.document.write('</style></head><body>');
        newWindow.document.write('<h1>Código Fuente [C++]</h1>');
        newWindow.document.write('<h2>' + tittle + '</h2>');
        newWindow.document.write('<div class="code-container"><pre className="code-snippet">' + code + '</pre></div>'); // Insertamos el código dentro del contenedor
        newWindow.document.write('</body></html>');
      }
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
      // Restablece el estado de error en cada ejecución
      setInputErrorMayor(false);
      setInputErrorMenor(false);
      setInputErrorVacio(false);
      setInputErrorDecimal(false);
      //Inicializo metricas
      setSolutionNodes(prevSolutionNodes => 0);
      setPrunedNodes(prevPrunedNodes => 0);
      setGeneratedNodes(prevGeneratedNodes => 0);
      if (chessboardWindow) {
        chessboardWindow.close();
        setChessboardWindow(null);
      }
      if (codeWindow) {
        codeWindow.close();
        setCodeWindow(null);
      }

      if (selectedAlgorithm=='Suma de Subconjuntos')
      {
        const inputNumbers = document.getElementById('inputNumbers').value;
        const inputTarget = parseFloat(document.getElementById('inputTarget').value);
        
        // Convierte la entrada de números separados por comas en un arreglo
        //const numbers = inputNumbers.split(',').map(Number);
        //Convierte la entrada de numeros separados por comas en un arreglo y filtra los ceros
        //const numbers = inputNumbers.split(',').map(Number).filter(num => num !== 0);
        // Convierte la entrada de números separados por comas en un arreglo, filtra los ceros y numeros repetidos
        let numbers = inputNumbers.split(',').map(Number).filter((num, index, arr) => arr.indexOf(num) === index && num !== 0);
        // Ordena los números en orden ascendente
        numbers.sort((a, b) => a - b);
        // Valida que la lista de números no esté vacía
        if (numbers.length === 0 || inputNumbers.trim() === '') {
          setInputErrorVacio(true);
          return;
        }
        // Valida que ninguno de los números en la lista sea un decimal
        if (numbers.some(number => number !== parseInt(number))) {
          setInputErrorDecimal(true);
          return;
        }
        // Realiza la validación
        if (inputTarget === '' || isNaN(inputTarget)) {
          setInputErrorVacio(true);
          return; // Detén la ejecución si hay un error
        }
        if (!Number.isInteger(inputTarget)) {
          setInputErrorDecimal(true);
          return; // Detén la ejecución si hay un error
        }

        if (selectedOption === 'BACKTRACKING') {
          let newTreeData;
          const start = performance.now(); // Tiempo inicial de ejecución
          if (selectedTreeType === 'generateTreeData') {
            if (selectedResolution === 'Con Poda') {
              const nodeCounter = { count: 1 };
              newTreeData = generateTreeData(0, inputTarget, numbers, 0, [], setPrunedNodes, setSolutionNodes, nodeCounter);

              // Podados = Calculo el total teorico de nodos para el arbol completo y le resto los generados
              const fun = (n) => {
                let suma = 0;
                for (let i = 0; i <= n; i++) {
                  suma += Math.pow(2, i);
                }
                return suma;
              };
              const total = fun(numbers.length);
              const generados =  --nodeCounter.count;
              setPrunedNodes(total - generados);

            } else if (selectedResolution === 'Sin Poda') {
              newTreeData = generateTreeDataSinPoda(0, inputTarget, numbers, 0, [], setPrunedNodes, setSolutionNodes);
            }
          } else if (selectedTreeType === 'generateTreeDatanario') {
            if (selectedResolution === 'Con Poda') {
              newTreeData = generateTreeDatanario(0, inputTarget, numbers, 0, [], setPrunedNodes, setSolutionNodes);
            } else if (selectedResolution === 'Sin Poda') {
              newTreeData = generateTreeDatanarioSinPoda(0, inputTarget, numbers, 0, [], setPrunedNodes, setSolutionNodes);
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
          // Realiza la validación
          if (inputTarget === '' || isNaN(inputTarget)) {
            setInputErrorVacio(true);
            return; // Detén la ejecución si hay un error
          }
          if (!Number.isInteger(inputTarget)) {
            setInputErrorDecimal(true);
            return; // Detén la ejecución si hay un error
          }
          if ((inputTarget < 4)) {
            setInputErrorMenor(true);
            return; // Detén la ejecución si hay un error
          }
          if (inputTarget > 9) {
            setInputErrorMayor(true);
            return; // Detén la ejecución si hay un error
          }
          let newTreeData;
          const initialBoard = Array.from({ length: inputTarget }, () => Array(inputTarget).fill(0));
          // Inicializar el contador de nodos
          const nodeCounter = { count: 1 };
          const start = performance.now(); // Tiempo inicial de ejecución
          newTreeData = generateNQueensTree(inputTarget, initialBoard, 0, setPrunedNodes, setSolutionNodes, [], undefined, nodeCounter);

          const end = performance.now(); // Tiempo final de ejecución

          setGeneratedNodes(--nodeCounter.count);

          const timeTaken = (end - start).toFixed(5); // Tiempo de ejecución en milisegundos
          setExecutionTime(timeTaken);

          setTreeData(newTreeData);
          setTreeVisible(true); // Mostrar el árbol cuando se presiona el botón de ejecutar
          setStep4Visible(true); // Avanza al paso 4

        }
        else if (selectedOption === 'COMPLEJIDAD_TEMPORAL'){
          // Destruye el gráfico existente si existe
          const existingChart = Chart.getChart("myChart1");
          if (existingChart) {
            existingChart.destroy();
          }

          const inputNumbers = document.getElementById('inputNumbers').value;
          const sizes = inputNumbers.split(',').map(Number);

          // Validar los tamaños
          // Validar si no se ingresa nada
          if (inputNumbers.trim() === '') {
            setInputErrorVacio(true);
            return;
          }

          // Validar los tamaños
          if (sizes.some(isNaN)) {
            setInputErrorVacio(true); // Podrías considerar cambiar este error si prefieres un mensaje diferente para NaN
            return;
          }
          if (sizes.some(size => size !== parseInt(size))) {
            setInputErrorDecimal(true); // Activa el error si alguno de los números no es un entero
            return;
          }
          if (sizes.some(size => size < 4)) {
            setInputErrorMenor(true);
            return;
          }
          if (sizes.some(size => size > 12)) {
            setInputErrorMayor(true);            
            return;
          }

          sizes.sort((a, b) => a - b);

          const executionTimes = [];
          const countNodes = [];
          runNQueensForDifferentSizes(sizes, executionTimes, countNodes, setPrunedNodes, setSolutionNodes);
          
          const ctx1 = document.getElementById('myChart1').getContext('2d');
          const ctx2 = document.getElementById('myChart2').getContext('2d');

          const [chart, chartTheoretical] = createExecutionTimeChart(ctx1, ctx2, sizes, executionTimes, countNodes);
          setStep4Visible(true);
          setGraphVisible(true);
          setDescriptionVisible(true);
          setExecuteDisabled(true);
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
      setDescriptionVisible(false);
      setPrunedNodes(0);
      setSolutionNodes(0);
      setGeneratedNodes(0);
      setExecutionTime(null);
      setSelectedAlgorithm('');
      setSelectedResolution('');
      setInputNumbers('');
      setInputTarget('');
      setButtonsDisabled(false);
      setExecuteDisabled(false);
      setInitialVisible(true);
      setStep0Visible(true);
      setStep1Visible(false);
      setStep2Visible(false);
      setStep3Visible(false);
      setStep4Visible(false);
      if (chessboardWindow) {
        chessboardWindow.close();
        setChessboardWindow(null);
      }
      if (codeWindow) {
        codeWindow.close();
        setCodeWindow(null);
      }
      window.location.reload();
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
        <header style={{ background: 'linear-gradient(to top, #CEDEBD, #FAF1E4)', padding: '20px', textAlign: 'center', color: '#fff', marginTop: '0px', marginBottom: '10px'}} onClick={handleReset}>
          <img src={logo} alt="Back Solution" style={{ width: '250px', height: '80px', cursor: 'pointer' }} />
        </header>


        <main>
          {/* Mostrar seccion de inicio */}
          {initialVisible && (
            <section className="initial-section">
              <div className="button-container" style={{ marginTop: '5px' }}>
                <button onClick={handleOptionChange} value="BACKTRACKING" disabled={buttonsDisabled}>BACKTRACKING</button>
                <button onClick={handleOptionChange} value="COMPLEJIDAD_TEMPORAL" disabled={buttonsDisabled}>COMPLEJIDAD TEMPORAL</button>
              </div>
            </section>
          )}

          {/* Sección del nombre */}
          {!initialVisible && (
            <div className="name-section" style={{ display: 'inline-flex', border: '1px solid black', padding: '5px', marginRight: '10px', alignItems: 'center', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
              <h2>{nameSection}</h2>
            </div>
          )}


          {/* Seleccion del algoritmo*/}
          {!initialVisible && (
            <section>
              <h2>Selecciona un Algoritmo</h2>
              <select value={selectedAlgorithm} onChange={handleAlgorithmChange} disabled={buttonsDisabled}>
                <option value="">Algoritmos</option>
                {selectedOption === "BACKTRACKING" ? (
                  algorithms.map((algorithm, index) => (
                    <option key={index} value={algorithm}>
                      {algorithm}
                    </option>
                  ))
                ) : (
                  <option value="N-Reinas">N-Reinas</option>
                )}
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
              <label>
                <input
                  type="radio"
                  value="Sin Poda"
                  checked={selectedResolution === 'Sin Poda'}
                  onChange={handleResolutionChange}
                />
                Sin poda
              </label>
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
            {inputErrorVacio && <p className="error-message"> Ingrese los valores requeridos!</p>}
            {InputErrorDecimal && <p className="error-message"> No puede ingresar números decimales</p>}
            </section>
        )}

        {step3Visible && selectedAlgorithm === "N-Reinas" && selectedOption === "BACKTRACKING" &&(
            <section>
              <h2>Carga de parámetros</h2>
            <form>
              <label>
                Cantidad de Reinas:
                <input type="text" id="inputTarget" inputmode="numeric" pattern="[0-9]*" />
              </label>
              <br />
            </form>
            {inputErrorVacio && <p className="error-message"> Ingrese la cantidad de reinas!</p>}
            {InputErrorDecimal && <p className="error-message"> No puede ingresar números decimales</p>}
            {inputErrorMenor && <p className="error-message"> No existe solución para menos de 4 reinas.</p>}
            {inputErrorMayor && <p className="error-message"> La cantidad de reinas no debe ser mayor a 9 para obtener una óptima visualización.</p>}
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
            {inputErrorVacio && <p className="error-message"> Ingrese los tamaños de entrada!</p>}
            {InputErrorDecimal && <p className="error-message"> No puede ingresar números decimales</p>}
            {inputErrorMenor && <p className="error-message"> No existe solución para una entrada menor a 4 reinas.</p>}
            {inputErrorMayor && <p className="error-message"> Ninguna entrada debe ser mayor a 12 reinas para obtener una óptima visualización.</p>}

            </section>
        )}

        {step3Visible && (
          <section>
            {((selectedAlgorithm && selectedResolution) || (selectedAlgorithm == "N-Reinas")) && (
              <button id="ejecutarBtn" onClick={handleExecute} disabled={executeDisabled}> <FontAwesomeIcon icon={faPlay} /> Ejecutar </button>
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
                      <div>
                        {selectedOption === "BACKTRACKING" && selectedAlgorithm === "N-Reinas" && (
                          <button 
                            onClick={handleShowChessboardInNewWindow} 
                            disabled={parseFloat(document.getElementById('inputTarget').value) > 6}
                            title={
                              parseFloat(document.getElementById('inputTarget').value) > 6
                                ? "Solo disponible hasta 6 reinas"
                                : ""
                            }
                            >      
                              <FontAwesomeIcon icon={faChessBoard} /> Ver Soluciones
                            </button>
                        )}   
                        <span style={{ marginLeft: '10px' }} /> {/* Agregamos un pequeño margen entre los botones */}
                        <button onClick={handleShowCodeInNewWindow}> <FontAwesomeIcon icon={faCode} /> Ver Código Fuente</button>
                      </div>
                      <div className="info-box">
                        <h2>Métricas</h2>
                        {generatedNodes !== 0 && <p>Nodos Generados: {generatedNodes}</p>}
                        <p>Nodos Podados: {prunedNodes}</p>
                        <p>Nodos Solucion: {solutionNodes}</p>
                        <p>Tiempo de ejecución: {executionTime} ms</p>
                      </div>
                  </div>
              )}
            </section>
        )}
        <section>
          {graphVisible && (
            <div className='graph' style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
              <div className='graph-container'>
                {descriptionVisible && (
                  <p style={{ maxWidth: '700px', padding: '10px', textAlign: 'justify' }}>
                    El análisis empírico se encarga de medir cuánto tiempo realmente tarda un algoritmo en ejecutarse en situaciones reales utilizando datos de entrada reales, es decir, es dependiente del hardware y su contexto.
                  </p>
                )}
                <canvas id="myChart1" width="700" height="500" style={{ marginBottom: '20px' }}></canvas>
                {descriptionVisible && (
                  <p style={{ maxWidth: '700px', padding: '10px', textAlign: 'justify' }}>
                    El análisis teórico considera el número de operaciones que realiza el algoritmo en función del tamaño de la entrada. La complejidad temporal teórica es utilizada para comparar algoritmos y determinar cuál es más eficiente en términos de cantidad de operaciones realizadas.<br/>
                    <span style={{ fontStyle: 'italic' }}>
                      {'<'}En este caso se utiliza como medición la cantidad de estados generados{'>'}
                    </span>
                  </p>
                )}
                <canvas id="myChart2" width="700" height="500" style={{ marginBottom: '20px' }}></canvas>
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
