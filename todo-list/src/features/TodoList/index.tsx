// 할 일 리스트
import React, { SyntheticEvent } from "react";
import styled from "@emotion/styled/macro";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { Todo, selectedTodoState } from "./atom";
import { todoStatisticsModalOpenState } from "../TodoStatisticsModal/atom";

const EtcItem = styled.li`
  padding: 2px 4px;
  margin: 0;
  font-size: 10px;
  cursor: pointer;
`;

const TodoItem = styled.li<{ done?: boolean; selected?: boolean }>`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${({ done, selected }) =>
    selected
      ? "rgba(112, 71, 235, 1)"
      : done
      ? "transparent"
      : "rgba(112, 71, 235, 0.4)"};
  padding: 2px 4px;
  margin: 0;
  border-radius: 8px;
  font-size: 10px;
  text-decoration: ${({ done }) => done && "line-through"};
  cursor: pointer;
`;

const Base = styled.ul`
  list-style: none;
  margin: 36px 0 0 0;
  padding: 0;
  width: 100%;
  height: 60px;
  ${TodoItem} + ${TodoItem} {
    margin-top: 1px;
  }
  ${TodoItem} + ${EtcItem} {
    margin-top: 1px;
  }
`;

interface TodoListProps {
  items: Array<Todo>;
}

const MAX_TODO_LIST_LENGTH = 3;

export default function TodoList({ items }: TodoListProps) {
  const selectedTodo = useRecoilValue(selectedTodoState);

  const setSelectedTodo = useSetRecoilState(selectedTodoState);
  // 통계 모달을 여는 역할
  const setTodoStatisticsModalOpen = useSetRecoilState(
    todoStatisticsModalOpenState
  );

  const handleClick = (e: SyntheticEvent<HTMLLIElement>, todo: Todo) => {
    e.stopPropagation();
    // 클릭 시 해당 todo를 selected Todo로 set해주는 Mapping
    setSelectedTodo(
      selectedTodo?.id === todo.id && selectedTodo.date === todo.date
        ? null
        : todo
    );
  };

  // 통계 모달을 여는 핸들 이벤트
  const handleTodoStatisticsModalOpen = (e: SyntheticEvent<HTMLLIElement>) => {
    e.stopPropagation();

    setTodoStatisticsModalOpen(true);
  };

  return (
    <Base>
      {items.slice(0, MAX_TODO_LIST_LENGTH).map((item, index) => (
        <TodoItem
          key={item.id}
          done={item.done}
          selected={
            item.date === selectedTodo?.date && item.id === selectedTodo?.id
          }
          onClick={(event: React.SyntheticEvent<HTMLLIElement>) =>
            handleClick(event, item)
          }
        >
          {item.content}
        </TodoItem>
      ))}
      {items.length > MAX_TODO_LIST_LENGTH && (
        <EtcItem onClick={handleTodoStatisticsModalOpen}>{`그 외 ${
          items.length - MAX_TODO_LIST_LENGTH
        }개...`}</EtcItem>
      )}
    </Base>
  );
}
