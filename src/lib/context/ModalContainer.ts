import { createContext, useContext } from "react";

interface ModalContainerContextProps {
  container: HTMLDivElement | null;
}

export const ModalContainerContext = createContext<ModalContainerContextProps>({
  container: null,
});

export const useModalContainer = () => useContext(ModalContainerContext);