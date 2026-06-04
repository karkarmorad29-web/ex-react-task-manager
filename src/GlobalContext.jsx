import { createContext } from 'react';
import { useTasks } from './useTasks.js';

export const GlobalContext = createContext({
    tasks: [],
    addTask: () => { },
    removeTask: () => { },
    updateTask: () => { },
});

export const GlobalProvider = ({ children }) => {
    const { tasks, addTask, removeTask, updateTask } = useTasks();

    return (
        <GlobalContext.Provider value={{ tasks, addTask, removeTask, updateTask }}>
            {children}
        </GlobalContext.Provider>
    );
};
