import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type ModalType = "passAccount" | "support" | "mentor" | "education" | null;

interface ModalContextType {
  modalType: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalType, setModalType] = useState<ModalType>(null);

  const openModal = (type: ModalType) => {
    console.log("openModal called with:", type); // برای دیباگ
    setModalType(type);
  };

  const closeModal = () => {
    console.log("closeModal called");
    setModalType(null);
  };

  return (
    <ModalContext.Provider value={{ modalType, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};
