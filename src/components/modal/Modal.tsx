import {
  ReactNode,
  cloneElement,
  createContext,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  width: 2rem;
  height: 2rem;
  top: 1rem;
  right: 1rem;
  position: absolute;
  border: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: center;
  align-items: center;
`;
type StyledModalWindowProps = {
  type?: string;
};
const StyledModalWindow = styled.div<StyledModalWindowProps>`
  display: flex;
  justify-content: center;
  position: relative;
  width: auto;
  min-height: 100vh;
  right: 0;
  top: 0;
  position: absolute;
  background-color: var(--color-grey-50);
  border: 1px solid var(--color-grey-100);
  ${(props) =>
    props.type === 'delete' &&
    css`
      width: 40vw;
      /* background-color: red; */
      background-color: var(--color-grey-400);
    `}
`;

type ModalContextProps = {
  openName: string;
  open: (name: string) => void;
  close: () => void;
};
type ModalProps = {
  children: ReactNode;
};
type OpenProps = {
  children: ReactNode;
  opens: string;
};
type ModalWindowProps = {
  children: ReactNode;
  name: string;
};
const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState<string>('');
  function open(name: string) {
    setOpenName(name);
  }
  function close() {
    setOpenName('');
  }
  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }: OpenProps) {
  const { open } = useContext(ModalContext) as ModalContextProps;
  return cloneElement(children as any, { onClick: () => open(opens) });
}

function Window({ children, name }: ModalWindowProps) {
  const { openName, close } = useContext(ModalContext) as ModalContextProps;
  if (name.toLowerCase() != openName.toLowerCase()) return null;

  return createPortal(
    <StyledModalWindow>
      <StyledButton onClick={close}>
        <HiXMark />
      </StyledButton>
      <div>{cloneElement(children as any, { onCloseModal: close })}</div>
    </StyledModalWindow>,
    document.body,
  );
}
Modal.Open = Open;
Modal.Window = Window;
