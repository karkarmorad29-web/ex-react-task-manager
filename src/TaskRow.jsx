import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const TaskRow = ({ task, checked, onToggle }) => {
    const getStatusClass = (status) => {
        switch (status) {
            case 'To do':
                return 'status-todo';
            case 'Doing':
                return 'status-doing';
            case 'Done':
                return 'status-done';
            default:
                return '';
        }
    };

    return (
        <tr className={checked ? 'selected-row' : ''}>
            <td className="task-select-cell">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggle(task.id)}
                    />
                </label>
                <Link to={`/task/${task.id}`}>{task.title}</Link>
            </td>
            <td>
                <span className={`status-badge ${getStatusClass(task.status)}`}>
                    {task.status}
                </span>
            </td>
            <td>{dayjs(task.createdAt).format('DD/MM/YYYY')}</td>
        </tr>
    );
};

export default React.memo(TaskRow);
