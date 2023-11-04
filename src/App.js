import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa los componentes de enrutamiento
import ReferencePage from './ReferencePage'; // Importa tus componentes personalizados
import HelpPage from './HelpPage';
import HomePage from './HomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/reference" element={<ReferencePage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );

}

export default App;
