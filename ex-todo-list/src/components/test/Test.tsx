import React from "react";
import { useRecoilState } from "recoil";
import { todoFormModalOpenState } from "../calendar/atom";
import styled from "@emotion/styled";
import Modal from "../Modal";

const ModalBody = styled.div`
  border-radius: 8xp;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  max-height: calc(100vh - 16px);
  overflow: hidden auto;
  position: relative;
  padding-block: 12px;
  padding-inline: 24px;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function Test() {
  const [isOpen, setIsOpen] = useRecoilState(todoFormModalOpenState);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalBody>
        <TitleBox>
          <h2>Title</h2>
          <p onClick={handleClose}>CLOSE</p>
        </TitleBox>
        <p>Description</p>
      </ModalBody>
    </Modal>
  );
}
