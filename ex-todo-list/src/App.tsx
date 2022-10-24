import React, { useState } from "react";
import styled from "@emotion/styled/macro";
import Modal from "./components/Modal";
import { todoFormModalOpenState } from "./components/calendar/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import Test from "./components/test/Test";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Button = styled.button`
  width: 200px;
  height: 60px;
  border-radius: 12px;
  color: #fff;
  background-color: #3d6afe;
  margin: 0;
  border: 0;
  font-size: 24px;
  &:active {
    opacity: 0.8;
  }
`;

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

function App() {
  // const [isOpen, setIsOpen] = useRecoilState(todoFormModalOpenState);
  const setTodoFormModalOpen = useSetRecoilState(todoFormModalOpenState);

  const handleOpen = () => {
    setTodoFormModalOpen(true);
    // setIsOpen(true);
  };

  const handleClose = () => {
    setTodoFormModalOpen(false);
    // setIsOpen(false);
  };

  return (
    <Container>
      <Button onClick={handleOpen}>OPEN</Button>
      {/* <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalBody>
          <TitleBox>
            <h2>Title</h2>
            <p onClick={handleClose}>CLOSE</p>
          </TitleBox>
          <p>Description</p>
        </ModalBody>
      </Modal> */}
      <Test />
    </Container>
  );
}

export default App;
