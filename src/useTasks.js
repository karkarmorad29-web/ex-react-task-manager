import { useState, useEffect } from 'react';

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL || '/tasks';

    useEffect(() => {
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
    }, [apiUrl]);

    const addTask = async ({ title, description, status }) => {
        const payload = { title, description, status };

        const resp = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const data = await resp.json();

        if (!data || data.success === false) {
            const msg = data && data.message ? data.message : 'Errore durante la creazione del task.';
            throw new Error(msg);
        }

        const createdTask = data.task;
        setTasks((prev) => [...prev, createdTask]);
        return createdTask;
    };

    const removeTask = (taskId) => {
        // TODO: Implementare rimozione task
    };

    const updateTask = (taskId, updatedTask) => {
        // TODO: Implementare aggiornamento task
    };

    return {
        tasks,
        addTask,
        removeTask,
        updateTask,
    };
};
