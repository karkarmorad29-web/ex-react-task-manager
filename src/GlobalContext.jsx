import { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext({
    tasks: [],
    setTasks: () => { },
});

export const GlobalProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || '/tasks';

        const loadTasks = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error ${response.status}`);
                }
                const data = await response.json();
                console.log('Tasks received from API:', data);
                setTasks(data);
            } catch (error) {
                console.error('Errore nel recupero dei task:', error);
            }
        };

        loadTasks();
    }, []);

    return (
        <GlobalContext.Provider value={{ tasks, setTasks }}>
            {children}
        </GlobalContext.Provider>
    );
};
