"use client";

import { runOpenAI } from "@utils/runOpenAI";
import { useRecoilState, useRecoilValue } from "recoil";
import { chatMessageListState, isTypingState, userInfoState } from "store";

interface PropsType {
  nameList: string[];
  contentList: string[];
}

export default function SelectMessage({ nameList, contentList }: PropsType) {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isTyping, setIsTyping] = useRecoilState(isTypingState);

  const [chatMessageList, setChatMessageList] =
    useRecoilState(chatMessageListState);

  const handleSelectClick = async (question: string) => {
    if (isTyping) return;
    setIsTyping(true);

    setChatMessageList((chatMessageList) => [
      ...chatMessageList,
      { id: chatMessageList.length + 1, message: question, isMine: true },
    ]);
    await runOpenAI(
      nameList,
      contentList,
      question,
      [
        ...chatMessageList,
        { id: chatMessageList.length + 1, message: question, isMine: true },
      ],
      setChatMessageList,
      userInfo
    );
    setIsTyping(false);
  };
  if (!isTyping)
    return (
      <div className="flex overflow-scroll gap-3">
        {userInfo.selectQuestion.map((question, index) => (
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
