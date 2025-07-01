// src/context/ModalContext.tsx
import React, { createContext, useContext, useState } from 'react';

type ModalType = 'success' | 'error' | 'info';

interface ModalState {
  show: boolean;
  message: string;
  title?: string;
  type: ModalType;
}

const ModalContext = createContext<any>(null);

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalState, setModalState] = useState<ModalState>({
    show: false,
    message: '',
    type: 'info',
  });

  const showModal = (type: ModalType, message: string, title?: string) => {
    setModalState({ show: true, message, type, title });

    // 🕒 Cierre automático para todos los tipos (incluido error)
    setTimeout(() => {
      setModalState((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const hideModal = () => {
    setModalState((prev) => ({ ...prev, show: false }));
  };

  return (
    <ModalContext.Provider value={{ ...modalState, showModal, hideModal }}>
      {children}
    </ModalContext.Provider>
  );
};
