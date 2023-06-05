"use client";

import { runOpenAI } from "@utils/runOpenAI";
import { useRecoilState } from "recoil";
import { chatMessageListState, isTypingState, userInfoState } from "store";

interface PropsType {
  drugDatabase: any[];
}

export default function SelectMessage({ drugDatabase }: PropsType) {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isTyping, setIsTyping] = useRecoilState(isTypingState);

  const [chatMessageList, setChatMessageList] =
    useRecoilState(chatMessageListState);

  const handleSelectClick = async (question: string) => {
    if (isTyping) return;
    setIsTyping(true);

    setChatMessageList((chatMessageList) => [
      ...chatMessageList,
      {
        type: "message",
        id: chatMessageList.length + 1,
        message: question,
        isMine: true,
      },
    ]);

    setUserInfo((userInfo) => {
      return {
        ...userInfo,
        selectQuestionList: userInfo.selectQuestionList.filter(
          (item) => item !== question
        ),
      };
    });

    await runOpenAI({
      drugDatabase,
      inputValue: question,
      chatMessageListState: [
        ...chatMessageList,
        {
          type: "message",
          id: chatMessageList.length + 1,
          message: question,
          isMine: true,
        },
      ],
      setChatMessageListState: setChatMessageList,
      userInfo,
    });
    setIsTyping(false);
  };
  if (!isTyping)
    return (
      <div className="flex overflow-scroll gap-3">
        {userInfo.selectQuestionList &&
          userInfo.selectQuestionList.map((question, index) => (
            <div
              key={index}
              className="px-[1.125rem] py-[0.75rem] rounded-[0.625rem] border border-[#F0F0F0] whitespace-nowrap"
              onClick={() => {
                handleSelectClick(question);
              }}
            >
              {question}
            </div>
          ))}
      </div>
    );
  else return <></>;
}
