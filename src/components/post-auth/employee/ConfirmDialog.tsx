import React from 'react';
import Modal from './Modal';
import Button from './Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'danger' | 'success';
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'danger',
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };
  
  const footer = (
    <>
      <Button variant="outline" onClick={onClose}>
        {cancelText}
      </Button>
      <Button variant={confirmVariant} onClick={handleConfirm}>
        {confirmText}
      </Button>
    </>
  );
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} footer={footer} size="sm">
      <p className="text-gray-600">{message}</p>
    </Modal>
  );
};

export default ConfirmDialog;