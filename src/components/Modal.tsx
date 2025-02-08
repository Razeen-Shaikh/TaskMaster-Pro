import React from "react";
import "./styles/Modal.css"; // Use appropriate CSS for styling

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, children }) => {
  if (!open) return null;

  return (
    <div className="popup-modal">
      <div className="popup-modal-content">
        <div className="popup-modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
