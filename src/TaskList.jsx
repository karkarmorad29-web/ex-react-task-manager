import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { GlobalContext } from './GlobalContext.jsx';
import TaskRow from './TaskRow.jsx';

const statusOrder = {
    'To do': 0,
    'Doing': 1,
    'Done': 2,
};

const TaskList = () => {
    const { tasks, removeMultipleTasks } = useContext(GlobalContext);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTaskIds, setSelectedTaskIds] = useState([]);
    const searchTimeout = useRef(null);

    const toggleSelection = (taskId) => {
        setSelectedTaskIds((prev) =>
            prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
        );
    };

    const handleDeleteSelected = async () => {
        try {
            await removeMultipleTasks(selectedTaskIds);
            alert(`Eliminati ${selectedTaskIds.length} task con successo.`);
            setSelectedTaskIds([]);
        } catch (error) {
            alert(error.message || 'Errore nell\'eliminazione multipla.');
        }
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder((current) => -current);
            return;
        }

        setSortBy(field);
        setSortOrder(1);
    };

    const sortIcon = (field) => {
        if (sortBy !== field) return '';
        return sortOrder === 1 ? ' ↑' : ' ↓';
    };

    const handleSearch = useCallback((event) => {
        const nextValue = event.target.value;

        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        searchTimeout.current = window.setTimeout(() => {
            setSearchQuery(nextValue.trim());
        }, 300);
    }, []);

    useEffect(() => {
        return () => {
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
            }
        };
    }, []);

    const sortedTasks = useMemo(() => {
        const normalizedQuery = searchQuery.toLowerCase();

        return [...tasks]
            .filter((task) => task.title.toLowerCase().includes(normalizedQuery))
            .sort((a, b) => {
                if (sortBy === 'title') {
                    return sortOrder * a.title.localeCompare(b.title, 'it', { sensitivity: 'base' });
                }

                if (sortBy === 'status') {
                    const aOrder = statusOrder[a.status] ?? 99;
                    const bOrder = statusOrder[b.status] ?? 99;
                    return sortOrder * (aOrder - bOrder) || a.title.localeCompare(b.title, 'it', { sensitivity: 'base' });
                }

                if (sortBy === 'createdAt') {
                    const aDate = new Date(a.createdAt).valueOf();
                    const bDate = new Date(b.createdAt).valueOf();
                    return sortOrder * (aDate - bDate) || a.title.localeCompare(b.title, 'it', { sensitivity: 'base' });
                }

                return 0;
            });
    }, [tasks, searchQuery, sortBy, sortOrder]);

    return (
        <main className="task-list-container">
            <h1>Task List</h1>
            <div className="task-search-wrapper">
                <input
                    type="search"
                    className="task-search"
                    placeholder="Cerca task per nome..."
                    onChange={handleSearch}
                />
            </div>
            {tasks.length === 0 ? (
                <p>Nessun task disponibile.</p>
            ) : (
                <>
                    {selectedTaskIds.length > 0 && (
                        <div className="bulk-actions">
                            <button className="btn btn-danger" onClick={handleDeleteSelected}>
                                Elimina Selezionate ({selectedTaskIds.length})
                            </button>
                        </div>
                    )}
                    <table className="task-table">
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('title')}>
                                    Nome{sortIcon('title')}
                                </th>
                                <th onClick={() => handleSort('status')}>
                                    Stato{sortIcon('status')}
                                </th>
                                <th onClick={() => handleSort('createdAt')}>
                                    Data di Creazione{sortIcon('createdAt')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTasks.map((task) => (
                                <TaskRow
                                    key={task.id}
                                    task={task}
                                    checked={selectedTaskIds.includes(task.id)}
                                    onToggle={toggleSelection}
                                />
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </main>
    );
};

export default TaskList;
