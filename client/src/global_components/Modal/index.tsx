import React, { useEffect } from "react";
import ReactDom from "react-dom";
import "./index.scss";
import "../../global_styles/index.scss";

interface Props {
  children: React.ReactNode;
  isOpened: boolean;
}

const Modal = ({ children, isOpened }: Props) => {
  useEffect(() => {
    const root = document.getElementById("root");
    (() => {
      if (!isOpened || !root) return null;
      root.style.filter = "blur(3px)";
    })();

    return () => {
      (() => {
        if (!root) return null;
        root.style.filter = "none";
      })();
    };
  }, [isOpened]);

  if (!isOpened) return null;

  const modalRoot = document.getElementById("modal");
  if (!modalRoot) return null;

  return ReactDom.createPortal(
    <div className="container-modal flex-center">{children}</div>,
    modalRoot
  );
};

export default Modal;
