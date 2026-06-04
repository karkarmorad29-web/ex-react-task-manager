import React, { useState, useRef, useContext } from 'react';
import { GlobalContext } from './GlobalContext.jsx';

const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

const AddTask = () => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const descriptionRef = useRef();
    const statusRef = useRef();

    const hasSymbols = (str) => {
        for (let ch of str) {
            if (symbols.includes(ch)) return true;
        }
        return false;
    };

    const validate = () => {
        const value = title.trim();
        if (value.length === 0) {
            setError('Il campo Nome non può essere vuoto.');
            return false;
        }
        if (hasSymbols(value)) {
            setError('Il campo Nome non può contenere simboli speciali.');
            return false;
        }
        setError('');
        return true;
    };

    const { addTask } = useContext(GlobalContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const payload = {
            title: title.trim(),
            description: descriptionRef.current ? descriptionRef.current.value : '',
            status: statusRef.current ? statusRef.current.value : 'To do',
        };

        try {
            await addTask(payload);
            alert('Task creata con successo.');

            // reset form
            setTitle('');
            if (descriptionRef.current) descriptionRef.current.value = '';
            if (statusRef.current) statusRef.current.value = 'To do';
        } catch (err) {
            alert(err.message || 'Errore nella creazione del task.');
        }
    };

    return (
        <main className="add-task-container">
            <h1>Aggiungi Task</h1>
            <form onSubmit={handleSubmit} noValidate>
                <div>
                    <label htmlFor="title">Nome del task</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="description">Descrizione</label>
                    <textarea id="description" ref={descriptionRef} />
                </div>

                <div>
                    <label htmlFor="status">Stato</label>
                    <select id="status" ref={statusRef} defaultValue="To do">
                        <option>To do</option>
                        <option>Doing</option>
                        <option>Done</option>
                    </select>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button type="submit">Aggiungi Task</button>
            </form>
        </main>
    );
};

export default AddTask;
