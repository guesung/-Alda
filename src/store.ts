import { atom } from "recoil";

const chatMessageListState = atom({
  key: "chatMessageListState",
  default: [
    {
      type: "message",
      id: 1,
      message: "안녕하세요.\nAI 챗봇 알다입니다. \n약 이름을 입력 해주세요.  ",
      isMine: false,
    },
  ],
});

const userInfoState = atom({
  key: "userInfoState",
  default: {
    name: "알다",
    drug: "",
    selectQuestionList: [
      "복용 방법과 시간",
      "피해야 할 약, 음식",
      "부작용 대처법",
      "보관 방법",
    ],
  },
});

const isTypingState = atom({
  key: "isTypingState",
  default: false,
});

export { chatMessageListState, userInfoState, isTypingState };
