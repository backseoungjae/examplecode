import { atom, atomFamily, selectorFamily } from "recoil";
import { filteredTodoListState } from "../TodoList/atom";

// 통계 모달의 열린 유무를 가르키는 atom
export const todoStatisticsModalOpenState = atom<boolean>({
  key: "todoStatisticsModalOpenState",
  default: false,
});

// 해당하는 날짜의 할 일 통계를 가져오는 atomFamily
export const todoStatisticsState = atomFamily<
  { total: number; done: number },
  Date
>({
  key: "todoStatisticsState",
  default: selectorFamily({
    key: "todoStatisticsState/default",
    get:
      (selectedDate) =>
      ({ get }) => {
        // filteredTodoList는 선택한 날짜를 인자로 받아서 해당하는 날짜의 todoList를 반환
        const todoList = get(filteredTodoListState(selectedDate));

        // 전체 할 일의 총 개수, 완료 된 할 일의 개수를 가져오는 통계 상태
        return {
          total: todoList.length,
          done: todoList.filter((todo) => todo.done).length || 0,
        };
      },
  }),
});
