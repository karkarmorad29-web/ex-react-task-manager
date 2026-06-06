const Features = () => {
    const features = [
        {
            id: 1,
            icon: '📋',
            title: 'Gestione Task',
            description: 'Crea, visualizza, modifica e elimina task con facilità. CRUD completo integrato con backend Express.',
        },
        {
            id: 2,
            icon: '🔍',
            title: 'Ricerca Intelligente',
            description: 'Cerca task per nome con debounce ottimizzato per massima responsività.',
        },
        {
            id: 3,
            icon: '📊',
            title: 'Ordinamento Dinamico',
            description: 'Ordina i task per titolo, stato o data. Bidirezionale con indicatori visivi.',
        },
        {
            id: 4,
            icon: '☑️',
            title: 'Selezione Multipla',
            description: 'Seleziona più task contemporaneamente ed eliminali in blocco con Promise.allSettled().',
        },
        {
            id: 5,
            icon: '🎨',
            title: 'Modale di Modifica',
            description: 'Modifica i dettagli di un task in una modale elegante e intuitiva.',
        },
        {
            id: 6,
            icon: '📱',
            title: 'Responsive Design',
            description: 'Layout fluido che si adatta a qualsiasi dispositivo.',
        },
        {
            id: 7,
            icon: '🔐',
            title: 'Validazione Duplicati',
            description: 'Preventivo di nomi duplicati sia in creazione che in modifica.',
        },
        {
            id: 8,
            icon: '⚡',
            title: 'Performance Optimized',
            description: 'React.memo, useMemo e useCallback per rendering ottimale.',
        },
    ];

    return (
        <main className="features-container">
            <section className="features-hero">
                <h1>Feature</h1>
                <p className="features-subtitle">
                    Scopri tutte le funzionalità avanzate del Task Manager.
                </p>
            </section>

            <section className="features-grid">
                {features.map((feature) => (
                    <div key={feature.id} className="feature-card">
                        <div className="feature-icon">{feature.icon}</div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </section>
        </main>
    );
};

export default Features;
