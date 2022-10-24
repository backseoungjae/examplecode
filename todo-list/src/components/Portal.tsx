import React, { ReactNode } from "react";
import { FC } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  selector?: string;
  children: ReactNode;
}

const Portal: FC<PortalProps> = ({ selector, children }) => {
  const rootElement = selector && document.querySelector(selector);

  return <>{rootElement ? createPortal(children, rootElement) : children}</>;
};

export default Portal;
