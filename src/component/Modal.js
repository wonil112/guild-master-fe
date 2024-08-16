import React from 'react';
import './Modal.css'; // 모달 관련 CSS 파일

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>{title}</h2>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button className="modal-confirm" onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
