import React from 'react';

const TaskRow = ({ task }) => {
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('it-IT');
    };

    return (
        <tr>
            <td>{task.title}</td>
            <td>
                <span className={`status-badge ${getStatusClass(task.status)}`}>
                    {task.status}
                </span>
            </td>
            <td>{formatDate(task.createdAt)}</td>
        </tr>
    );
};

export default React.memo(TaskRow);
