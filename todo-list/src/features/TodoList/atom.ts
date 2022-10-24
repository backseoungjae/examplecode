import { atom, atomFamily, selectorFamily } from "recoil";
import { isSameDay } from "../../utils/date";

export interface Todo {
  id: string;
  content: string;
  done: boolean;
  date: Date;
}

// 할 일 목록
export const todoListState = atom<Array<Todo>>({
  key: "todoListState",
  default: [],
});

// 선택한 날짜
export const selectedDateState = atom<Date>({
  key: "selectedDateState",
  default: new Date(),
});

// 선택한 할 일
export const selectedTodoState = atom<Todo | null>({
  key: "selectedTodoState",
  default: null,
});

// 선택한 날짜를 인자로 받아서 해당하는 날짜의 todoList 필터링해서 가져 오는 atomFamily
export const filteredTodoListState = atomFamily<Array<Todo>, Date>({
  key: "filteredTodoListState",
  default: selectorFamily({
    key: "filteredTodoListState/default",
    // 선택한 날짜를 받아와서 해당 하는 날짜의 todoList의 필터링 하는 역할
    get:
      (selectedDate) =>
      ({ get }) => {
        // 여기서 todoList는 전체 모든 날짜의 todoList
        const todoList = get(todoListState);

        // 선택한 날짜의 todoList만 가져옴
        return todoList.filter((todo) => isSameDay(todo.date, selectedDate));
      },
  }),
});
