import { atom } from "recoil";

const chatMessageListState = atom({
  key: "chatMessageListState",
  default: [],
});

export { chatMessageListState };
