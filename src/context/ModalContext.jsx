import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    show: false,
    message: ''
  });

  const showSuccessModal = (message) => {
    setModalState({
      show: true,
      message
    });
  };

  const hideSuccessModal = () => {
    setModalState({
      show: false,
      message: ''
    });
  };

  return (
    <ModalContext.Provider value={{ modalState, showSuccessModal, hideSuccessModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}; 