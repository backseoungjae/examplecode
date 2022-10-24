// 외부 돔에 랜더링 하는 역할
// 모달 컴포넌트를 외부 돔에 랜더링을 해준다
import React from "react";
import { createPortal } from "react-dom";

interface Portal {
  selector?: string;
  children?: any;
}

export default function Portal({ children, selector }: Portal) {
  const rootElement = selector && document.querySelector(selector);

  return <>{rootElement ? createPortal(children, rootElement) : children}</>;
}
