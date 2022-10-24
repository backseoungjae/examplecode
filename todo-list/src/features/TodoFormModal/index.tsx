// 할일 등록
import React, { ChangeEvent, useRef, useState } from "react";
import styled from "@emotion/styled/macro";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";

import { todoFormModalOpenState } from "./atom";
import Modal from "../../components/Modal";
import { selectedDateState, todoListState } from "../TodoList/atom";
import { getSimpleDateFormat } from "../../utils/date";
import { KeyboardEvent } from "react";

const Container = styled.div`
  width: 100vw;
  max-width: 386px;
  padding: 8px;
`;

const Date = styled.small`
  display: block;
  color: #c9c8cc;
`;

const InputTodo = styled.input`
  padding: 16px 24px;
  border: none;
  width: 100%;
  box-sizing: border-box;
  background-color: transparent;
  color: #c9c8cc;
  caret-color: #c9c8cc;
`;

const Card = styled.div`
  width: 100%;
  max-width: 370px;
  border-radius: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 24px;
  box-sizing: border-box;
  background-color: #19181a;
  ${Date} + ${InputTodo} {
    margin-top: 24px;
  }
`;

export default function TodoFormModal() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  // 작성한 ToDo
  const [todo, setTodo] = useState<string>("");

  const selectedDate = useRecoilValue(selectedDateState);
  const todoList = useRecoilValue(todoListState);

  const [isOpen, setIsOpen] = useRecoilState(todoFormModalOpenState);

  const handleClose = () => {
    setIsOpen(false);
  };

  const reset = () => {
    setTodo("");
    inputRef.current?.focus();
  };

  // todo를 추가해주는 함수
  const addTodo = useRecoilCallback(
    ({ snapshot, set }) =>
      () => {
        const todoList = snapshot.getLoadable(todoListState).getValue();

        const newTodo = {
          id: uuidv4(),
          content: todo,
          done: false,
          date: selectedDate,
        };

        set(todoListState, [...todoList, newTodo]);
      },
    [todo, selectedDate, todoList]
  );

  // 엔터키를 눌렀을 때 할일 목록을 추가시키는 핸들키프레스 함수
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo();
      reset();
      handleClose();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Container>
        <Card>
          <Date>{getSimpleDateFormat(selectedDate)}</Date>
          <InputTodo
            ref={inputRef}
            placeholder="새로운 이벤트"
            onKeyPress={handleKeyPress}
            value={todo}
            onChange={handleChange}
          />
        </Card>
      </Container>
    </Modal>
  );
}
