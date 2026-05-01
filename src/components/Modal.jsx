import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

export default function Modal({ open, onClose, children, className = "" }) {
  const thisModal = useRef();

  useEffect(() => {
    if (open) {
      thisModal.current.showModal();
    } else {
      thisModal.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog ref={thisModal} className={`modal ${className}`} onCancel={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal"),
  );
}
