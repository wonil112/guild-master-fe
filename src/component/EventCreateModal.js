import React, { useState } from 'react';
import Modal from './Modal';
import './EventCreateModal.css';

const EventCreateModal = ({ isOpen, onClose, onCreateEvent }) => {
    const [eventName, setEventName] = useState('');
    const [maxParticipants, setMaxParticipants] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEvent = {
            eventName,
            maxParticipants: parseInt(maxParticipants),
            startDate,
            endDate,
            description
        };
        onCreateEvent(newEvent);
        onClose();
    };

    const modalContent = (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="eventName">이벤트 명</label>
                <input
                    type="text"
                    id="eventName"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="maxParticipants">최대 인원수</label>
                <input
                    type="number"
                    id="maxParticipants"
                    value={maxParticipants}
                    onChange={(e) => setMaxParticipants(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="startDate">시작 날짜</label>
                <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="endDate">종료 날짜</label>
                <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">이벤트 설명</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
        </form>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="이벤트 생성"
            buttonText="생성"
            onButtonClick={handleSubmit}
        >
            {modalContent}
        </Modal>
    );
};

export default EventCreateModal;