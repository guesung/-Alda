"use client";

import { runOpenAI } from "@utils/runOpenAI";
import clsx from "clsx";
import { useRecoilState } from "recoil";
import { chatMessageListState, isTypingState, userInfoState } from "store";
import { chatMessageType, drugType, selectQuestionType } from "types/chat";

interface PropsType {
  drugDatabase: drugType[];
  chatMessage: chatMessageType;
}

export default function SelectMessage({
  drugDatabase,
  chatMessage,
}: PropsType) {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isTyping, setIsTyping] = useRecoilState(isTypingState);
  const [chatMessageList, setChatMessageList] =
    useRecoilState(chatMessageListState);
  const handleSelectClick = async (question: string) => {
    setIsTyping(true);
    if (typeof chatMessage.message === "string") return;
    if (chatMessage.message.some((it: any) => it.isSelected === true)) return;
    const questionList = userInfo.selectQuestionList.map((selectQuestion) => {
      return selectQuestion.question === question
        ? {
            question,
            isSelected: true,
          }
        : selectQuestion;
    });

    const newChatMessageList = chatMessageList.map((item) => {
      if (item.id === chatMessage.id) {
        return {
          id: chatMessage.id,
          type: "button",
          message: questionList as any,
          isMine: true,
        };
      } else {
        return item;
      }
    });

    setUserInfo((userInfo) => {
      return {
        ...userInfo,
        selectQuestionList: userInfo.selectQuestionList.filter(
          (item) => item.question !== question
        ),
      };
    });

    await runOpenAI({
      drugDatabase,
      inputValue: question,
      chatMessageListState: [
        ...newChatMessageList,
        {
          type: "message",
          id: chatMessageList.length + 1,
          message: question,
          isMine: true,
        },
      ],
      setChatMessageListState: setChatMessageList,
      userInfo: {
        ...userInfo,
        selectQuestionList: userInfo.selectQuestionList.filter(
          (item) => item.question !== question
        ),
      },
    });
    setIsTyping(false);
  };

  return (
    <div className="flex overflow-scroll gap-3 mb-4">
      {typeof chatMessage.message !== "string" &&
        chatMessage.message.map((messageList: any, index: number) => (
          <div
            key={index}
            className={clsx(
              "px-[1.125rem] py-[0.75rem] rounded-[0.625rem] border border-[#F0F0F0] whitespace-nowrap",
              messageList.isSelected && "bg-[#262626] text-[#F0F0F0]"
            )}
            onClick={() => {
              if (messageList.isSelected || isTyping) return;
              handleSelectClick(messageList.question);
            }}
          >
            {messageList.question}
          </div>
        ))}
    </div>
  );
}
