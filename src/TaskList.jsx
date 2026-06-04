import { useContext } from 'react';
import { GlobalContext } from './GlobalContext.jsx';
import TaskRow from './TaskRow.jsx';

const TaskList = () => {
    const { tasks } = useContext(GlobalContext);

    return (
        <main className="task-list-container">
            <h1>Task List</h1>
            {tasks.length === 0 ? (
                <p>Nessun task disponibile.</p>
            ) : (
                <table className="task-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Stato</th>
                            <th>Data di Creazione</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <TaskRow key={task.id} task={task} />
                        ))}
                    </tbody>
                </table>
            )}
        </main>
    );
};

export default TaskList;
