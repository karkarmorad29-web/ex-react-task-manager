import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalContext } from './GlobalContext.jsx';
import Modal from './Modal.jsx';
import EditTaskModal from './EditTaskModal.jsx';

const TaskDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, removeTask, updateTask } = useContext(GlobalContext);

    const taskId = parseInt(id, 10);
    const task = tasks.find((t) => t.id === taskId);

    if (!task) {
        return (
            <main className="task-detail-container">
                <h2>Task non trovato</h2>
                <button className="btn" onClick={() => navigate('/')}>Torna alla lista</button>
            </main>
        );
    }

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleDelete = () => {
        setShowModal(true);
    };

    const handleEdit = () => {
        setShowEditModal(true);
    };

    const handleSaveEdit = async (updated) => {
        try {
            await updateTask(updated);
            alert('Task aggiornata con successo.');
            setShowEditModal(false);
        } catch (err) {
            alert(err.message || 'Errore durante l\'aggiornamento.');
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await removeTask(taskId);
            setShowModal(false);
            alert('Task eliminata con successo.');
            navigate('/');
        } catch (err) {
            setShowModal(false);
            alert(err.message || "Errore durante l'eliminazione.");
        }
    };

    return (
        <main className="task-detail-container">
            <h1>{task.title}</h1>
            <p><strong>Stato:</strong> {task.status}</p>
            <p><strong>Descrizione:</strong> {task.description}</p>
            <p><strong>Creato il:</strong> {new Date(task.createdAt).toLocaleString('it-IT')}</p>
            <div className="task-detail-actions">
                <button onClick={handleEdit} className="btn">Modifica Task</button>
                <button onClick={handleDelete} className="btn btn-danger">Elimina Task</button>
                <button onClick={() => navigate('/')} className="btn btn-secondary">Annulla</button>
            </div>

            <Modal
                title="Conferma eliminazione"
                content={<p>Sei sicuro di voler eliminare questo task?</p>}
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirmDelete}
                confirmText="Elimina"
            />

            <EditTaskModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                task={task}
                onSave={handleSaveEdit}
            />
        </main>
    );
};

export default TaskDetail;
