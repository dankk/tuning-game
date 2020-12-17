import { atom } from "recoil";

export const startState = atom({
  key: "startState",
  default: false,
});

export const difficultyState = atom({
  key: "difficultyState",
  default: 1,
});

export const selectedNoteIndexesState = atom({
  key: "selectedNoteIndexesState",
  default: [],
});