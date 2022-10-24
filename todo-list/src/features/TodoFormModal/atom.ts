// 할 일 등록 모달의 open 상태를 가르킴
import { atom } from "recoil";

export const todoFormModalOpenState = atom<boolean>({
  key: "todoFormModalOpenState",
  default: false,
});
