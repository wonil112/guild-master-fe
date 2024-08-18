import React from 'react';
import './Modal.css';

const Modal = ({ event, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>{event.eventName}</h2>
                <p>Start Time: {event.startDate}</p>
                <p>End Time: {event.dueDate}</p>
                <p>Status: {event.eventStatus}</p>
                <p>Participants: {event.eventCurrentPopulation} / {event.eventTotalPopulation}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;