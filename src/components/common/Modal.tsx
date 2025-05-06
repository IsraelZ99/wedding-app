import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { CustomDialogProps } from "./Props";
import theme from "../../styles/_base-theme.module.scss";

import { CgClose } from "react-icons/cg";
import "../../styles/modal.scss";

interface ModalProps {
  children?: React.ReactNode;
  headerText: string;
  onCloseModal?: () => void;
  ref?: React.RefObject<CustomDialogProps | null>;
}

const Modal: React.FC<ModalProps> = forwardRef(function Modal(
  { children, headerText, onCloseModal },
  ref
) {
  const dialog = useRef<HTMLDialogElement>(null);
  const portalDiv = document.getElementById("modal") as HTMLElement;

  let closeIconSize = "";
  if (window.innerWidth >= 1200) {
    closeIconSize = "40";
  } else {
    closeIconSize = "60";
  }

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current?.showModal();
      },
      close() {
        dialog.current?.close();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="modal">
      <section className="modal-header">
        <p className="modal-header-text">{headerText}</p>
        <button
          className="modal-header-close-container"
          onClick={() => {
            if (onCloseModal) onCloseModal();
            dialog.current?.close();
          }}
        >
          <CgClose
            size={`${closeIconSize}%`}
            className="modal-close-icon"
            color={`${theme.white}`}
          />
        </button>
      </section>
      <section className="modal-body">{children}</section>
      <section className="modal-footer">
        <div className="modal-footer-line"></div>
        <form method="dialog" className="modal-footer-close-button-container">
          <button className="modal-footer-close-button" onClick={onCloseModal}>
            Cerrar
          </button>
        </form>
      </section>
    </dialog>,
    portalDiv
  );
});

export default Modal;
