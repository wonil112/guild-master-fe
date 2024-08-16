import React from 'react';
import './Modal.css'; // 모달 스타일

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
    
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button onClick={onClose}>X</button>
        {title && <h2>{title}</h2>}
        <div>{children}</div>
        <button onClick={onClose}>저장!!</button>
      </div>
    </div>
  );
}

export default Modal;