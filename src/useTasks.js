import { useState, useEffect } from 'react';

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL || '/api/tasks';

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

    const removeTask = async (taskId) => {
        const resp = await fetch(`${apiUrl}/${taskId}`, {
            method: 'DELETE',
        });

        const data = await resp.json();

        if (!data || data.success === false) {
            const msg = data && data.message ? data.message : 'Errore durante l\'eliminazione del task.';
            throw new Error(msg);
        }

        // success
        setTasks((prev) => prev.filter((t) => t.id !== taskId));
        return true;
    };

    const updateTask = async (updatedTask) => {
        // updatedTask must contain an `id` property
        if (!updatedTask || typeof updatedTask.id === 'undefined') {
            throw new Error('updatedTask deve contenere l\'id');
        }

        const resp = await fetch(`${apiUrl}/${updatedTask.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask),
        });

        const data = await resp.json();

        if (!data || data.success === false) {
            const msg = data && data.message ? data.message : 'Errore durante l\'aggiornamento del task.';
            throw new Error(msg);
        }

        const serverTask = data.task;
        setTasks((prev) => prev.map((t) => (t.id === serverTask.id ? serverTask : t)));
        return serverTask;
    };

    return {
        tasks,
        addTask,
        removeTask,
        updateTask,
    };
};
