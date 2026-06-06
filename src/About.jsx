const About = () => {
    return (
        <main className="about-container">
            <section className="about-hero">
                <h1>React Task Manager</h1>
                <p className="about-subtitle">
                    Un'applicazione completa per gestire i tuoi task in modo efficiente e intuitivo.
                </p>
            </section>

            <section className="about-content">
                <div className="about-section">
                    <h2>Chi siamo</h2>
                    <p>
                        Questo progetto è una dimostrazione di una modern web application costruita con React 19 e Vite.
                        Integra un backend Express per la persistenza dei dati e utilizza le migliori pratiche di performance
                        e user experience.
                    </p>
                </div>

                <div className="about-section">
                    <h2>Stack Tecnologico</h2>
                    <ul className="tech-stack">
                        <li><strong>Frontend:</strong> React 19, Vite, React Router DOM</li>
                        <li><strong>State Management:</strong> Context API + useReducer</li>
                        <li><strong>Backend:</strong> Express.js</li>
                        <li><strong>Utilities:</strong> dayjs (date formatting)</li>
                        <li><strong>Styling:</strong> CSS3 con variabili CSS</li>
                    </ul>
                </div>

                <div className="about-section">
                    <h2>Architettura</h2>
                    <p>
                        L'applicazione segue il pattern di centralizzazione dello stato tramite Context API e useReducer,
                        garantendo una gestione prevedibile e efficiente dei dati. Il backend Express fornisce API CRUD
                        per i task, mentre il frontend utilizza Vite proxy per evitare conflitti di routing.
                    </p>
                </div>

                <div className="about-section">
                    <h2>Principi di Design</h2>
                    <ul className="design-principles">
                        <li>🎯 <strong>Performance First:</strong> useMemo, useCallback, React.memo</li>
                        <li>🎨 <strong>User Experience:</strong> Debounce, loading states, error handling</li>
                        <li>🔒 <strong>Data Integrity:</strong> Validazione duplicati, Promise.allSettled()</li>
                        <li>📱 <strong>Responsive:</strong> Layout fluido e mobile-friendly</li>
                    </ul>
                </div>
            </section>
        </main>
    );
};

export default About;
