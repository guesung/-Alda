import { atom } from "recoil";

const chatMessageListState = atom({
  key: "chatMessageListState",
  default: [
    {
      id: 1,
      message: "안녕하세요.\nAI 챗봇 알다입니다. \n약 이름을 입력 해주세요.",
      isMine: false,
    },
  ],
});

const userInfoState = atom({
  key: "userInfoState",
  default: {
    name: "",
    drug: "",
    selectQuestionList: ["주의 사항", "유의 사항"],
  },
});

const isTypingState = atom({
  key: "isTypingState",
  default: false,
});

export { chatMessageListState, userInfoState, isTypingState };
