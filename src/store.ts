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
      {
        question: "복용 방법과 시간",
        isSelected: false,
      },
      {
        question: "피해야 할 약, 음식",
        isSelected: false,
      },
      {
        question: "부작용 대처법",
        isSelected: false,
      },
      {
        question: "보관 방법",
        isSelected: false,
      },
    ],
  },
});

const isTypingState = atom({
  key: "isTypingState",
  default: false,
});

export { chatMessageListState, userInfoState, isTypingState };
