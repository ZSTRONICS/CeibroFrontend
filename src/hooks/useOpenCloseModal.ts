import { useState } from "react";

type ModalHookReturnType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const useOpenCloseModal = (): ModalHookReturnType => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  return { isOpen, openModal, closeModal };
};

export default useOpenCloseModal;
