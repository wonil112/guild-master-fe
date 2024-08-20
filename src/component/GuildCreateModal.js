import React, { useState } from 'react';
import Modal from './Modal';

const GuildCreateModal = ({ isOpen, onClose, onSave }) => {
    const [editName, setEditName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const handleSave = () => {
        onSave({ name: editName, password: newPassword });
        onClose();
    };

    const handlePasswordChange = () => {
        setIsChangingPassword(true);
    };

    const modalContent = (
        <div className="member-info">
            <div className="info-item">
                <h3>이름</h3>
                <input 
                    value={editName} 
                    onChange={(e) => setEditName(e.target.value)}
                />
            </div>
            <div className="info-item">
                <h3>비밀번호</h3>
                {isChangingPassword ? (
                    <input 
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="새 비밀번호"
                    />
                ) : (
                    <button onClick={handlePasswordChange}>비밀번호 변경</button>
                )}
            </div>
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="회원 정보 수정"
            buttonText="저장"
            onButtonClick={handleSave}
        >
            {modalContent}
        </Modal>
    );
};

export default GuildCreateModal;