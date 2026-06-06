import React, { useEffect, useRef, useState } from 'react';
import Modal from './Modal.jsx';

const EditTaskModal = ({ show, onClose, task, onSave }) => {
    const formRef = useRef(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('To do');

    useEffect(() => {
        if (task) {
            setTitle(task.title || '');
            setDescription(task.description || '');
            setStatus(task.status || 'To do');
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!onSave) return;

        const updated = {
            id: task.id,
            title: title.trim(),
            description,
            status,
            createdAt: task.createdAt,
        };

        onSave(updated);
    };

    const content = (
        <form ref={formRef} onSubmit={handleSubmit} className="edit-task-form">
            <div>
                <label>Nome</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
                <label>Descrizione</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <label>Stato</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option>To do</option>
                    <option>Doing</option>
                    <option>Done</option>
                </select>
            </div>
        </form>
    );

    return (
        <Modal
            title="Modifica Task"
            content={content}
            show={show}
            onClose={onClose}
            onConfirm={() => formRef.current && formRef.current.requestSubmit()}
            confirmText="Salva"
            confirmClassName="btn btn-primary"
        />
    );
};

export default EditTaskModal;
