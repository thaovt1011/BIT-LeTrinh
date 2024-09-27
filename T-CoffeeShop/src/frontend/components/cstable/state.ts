import { atom } from "recoil";

export const animationStartState = atom<number>({
  key: "animationStart",
  default: 0,
});
