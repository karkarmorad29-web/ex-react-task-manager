import { useEffect, useReducer } from 'react';
import { tasksReducer } from './tasksReducer.js';

export const useTasks = () => {
    const [tasks, dispatch] = useReducer(tasksReducer, []);
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
                dispatch({ type: 'LOAD_TASKS', payload: data });
            } catch (error) {
                console.error('Errore nel recupero dei task:', error);
            }
        };

        loadTasks();
    }, [apiUrl]);

    const addTask = async ({ title, description, status }) => {
        const normalizedTitle = title.trim().toLowerCase();
        if (tasks.some((task) => task.title.trim().toLowerCase() === normalizedTitle)) {
            throw new Error('Esiste già un task con questo nome.');
        }

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
        dispatch({ type: 'ADD_TASK', payload: createdTask });
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

        dispatch({ type: 'REMOVE_TASK', payload: taskId });
        return true;
    };

    const removeMultipleTasks = async (taskIds) => {
        if (!Array.isArray(taskIds) || taskIds.length === 0) {
            return true;
        }

        const results = await Promise.allSettled(
            taskIds.map(async (taskId) => {
                try {
                    const resp = await fetch(`${apiUrl}/${taskId}`, {
                        method: 'DELETE',
                    });

                    const data = await resp.json();

                    if (!data || data.success === false) {
                        throw new Error(data && data.message ? data.message : `Errore nella cancellazione del task ${taskId}`);
                    }

                    return { taskId, success: true };
                } catch (error) {
                    return { taskId, success: false, error: error.message };
                }
            })
        );

        const successIds = results
            .filter((result) => result.status === 'fulfilled' && result.value.success)
            .map((result) => result.value.taskId);

        const failedIds = results
            .filter((result) => result.status === 'fulfilled' && !result.value.success)
            .map((result) => result.value.taskId)
            .concat(
                results
                    .filter((result) => result.status === 'rejected')
                    .map((result) => (result.reason && result.reason.taskId ? result.reason.taskId : undefined))
                    .filter((id) => typeof id !== 'undefined')
            );

        if (successIds.length > 0) {
            dispatch({ type: 'REMOVE_MULTIPLE_TASKS', payload: successIds });
        }

        if (failedIds.length > 0) {
            throw new Error(`Impossibile eliminare i task con ID: ${failedIds.join(', ')}`);
        }

        return true;
    };

    const updateTask = async (updatedTask) => {
        // updatedTask must contain an `id` property
        if (!updatedTask || typeof updatedTask.id === 'undefined') {
            throw new Error('updatedTask deve contenere l\'id');
        }

        const normalizedTitle = updatedTask.title.trim().toLowerCase();
        if (
            tasks.some(
                (task) => task.id !== updatedTask.id && task.title.trim().toLowerCase() === normalizedTitle
            )
        ) {
            throw new Error('Esiste già un task con questo nome.');
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
        dispatch({ type: 'UPDATE_TASK', payload: serverTask });
        return serverTask;
    };

    return {
        tasks,
        addTask,
        removeTask,
        removeMultipleTasks,
        updateTask,
    };
};
