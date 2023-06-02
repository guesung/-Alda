import { atom } from "recoil";

const chatMessageListState = atom({
  key: "chatMessageListState",
  default: [{ id: 0, message: "test", isMine: true }],
});

export { chatMessageListState };
