import React, { useEffect } from 'react';

const SuccessModal = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="success-modal show">
      <div className="success-modal__content">
        <div className="success-modal__icon">
          <i className="ph ph-check-circle text-success-600 text-2xl" />
        </div>
        <div className="success-modal__message">
          <h3 className="text-heading-5 mb-4">Success!</h3>
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal; 