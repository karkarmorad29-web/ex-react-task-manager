import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ title, content, show, onClose, onConfirm, confirmText = 'Conferma', confirmClassName = 'btn btn-danger' }) => {
    if (!show) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                {title && <h3 className="modal-title">{title}</h3>}
                <div className="modal-content">{content}</div>
                <div className="modal-actions">
                    <button className="btn btn-secondary" onClick={onClose}>Annulla</button>
                    <button className={confirmClassName} onClick={onConfirm}>{confirmText}</button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
