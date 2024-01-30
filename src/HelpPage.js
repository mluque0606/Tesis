import React from 'react';
import { Link } from 'react-router-dom';


function HelpPage({ onClose }) {
    return (
        <div>
    
          {/* Contenido de la página de ayuda */}
            <header>
                <h1>PAGINA DE AYUDA</h1>
            </header>

            <main>
                <section>
                    <h2>GUIA DE COMO USAR LA PAGINA</h2>
                    <p>....</p>
                </section>

                <section>
                    <h2>...</h2>
                </section>
            </main>

            <footer>

            </footer>
        </div>
    );
}

export default HelpPage;
