"use client";

import { runOpenAI } from "@utils/runOpenAI";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { chatMessageListState, isTypingState, userInfoState } from "store";

interface PropsType {
  nameList: string[];
  contentList: string[];
}

export default function ChatInput({ nameList, contentList }: PropsType) {
  const [input, setInput] = useState<string>("");

  const [isTyping, setIsTyping] = useRecoilState(isTypingState);

  const [chatMessageList, setChatMessageList] =
    useRecoilState(chatMessageListState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const [autoCompleteWordList, setAutoCompleteWordList] = useState<string[]>(
    []
  );

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (input)
        setAutoCompleteWordList(
          nameList.filter((name) => name.includes(input))
        );
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [input, nameList]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (userInfo.drug === "") {
      alert("약을 선택해주세요");
      return;
    }
    if (isTyping) return;
    setIsTyping(true);
    setAutoCompleteWordList([]);

    setChatMessageList((chatMessageList) => [
      ...chatMessageList,
      { id: chatMessageList.length + 1, message: input, isMine: true },
    ]);
    if (userInfo.drug === "") {
      setUserInfo({
        ...userInfo,
        drug: input,
      });
    }

    const inputSave = input;
    setInput("");
    await runOpenAI(
      nameList,
      contentList,
      inputSave,
      [
        ...chatMessageList,
        { id: chatMessageList.length + 1, message: inputSave, isMine: true },
      ],
      setChatMessageList,
      userInfo
    );
    setIsTyping(false);
  };

  const handleAutoCompleteClick = async (word: string) => {
    if (isTyping) return;
    setIsTyping(true);
    setAutoCompleteWordList([]);
    setInput("");
    if (userInfo.drug === "") {
      setUserInfo({
        ...userInfo,
        drug: input,
      });
    }
    await runOpenAI(
      nameList,
      contentList,
      word,
      [
        ...chatMessageList,
        { id: chatMessageList.length + 1, message: word, isMine: true },
      ],
      setChatMessageList,
      userInfo
    );
    setIsTyping(false);
  };

  const heightValue = `${Math.min(autoCompleteWordList.length, 4) * 3.125}rem`;

  return (
    <div className="fixed max-w-[28.125rem] bottom-0 left-0 right-0 m-auto h-[4rem] bg-[#FFF] shadow-lg flex justify-center items-center">
      <div
        className="absolute overflow-scroll w-full"
        style={{ top: `-${heightValue}`, height: `${heightValue}` }}
      >
        {autoCompleteWordList.map((word: string, index: number) => (
          <p
            onClick={() => {
              handleAutoCompleteClick(word);
            }}
            key={index}
            className="h-[3.125rem] flex items-center border-t border-[#EEE] px-5 text-[#707478]"
          >
            {word}
          </p>
        ))}
      </div>
      <form className="flex" onSubmit={handleSubmit}>
        <div className="bg-gradient-to-r rounded-[1.875rem] h-[2.6rem] w-[17rem] flex justify-center items-center from-[#14C8C8] via-[#D5E7F3] to-[#C1CFFF] relative">
          <input
            type="text"
            className="h-[2.5rem] w-[16.9375rem] border rounded-[1.875rem] px-[1.25rem] text-[#34363C] placeholder-[#ACACAC]"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder="타이레놀"
            value={input}
          />
          <Image
            src="/icons/mike.svg"
            alt="mike"
            width={20}
            height={20}
            className="absolute right-4"
          />
        </div>
        <button type="submit">
          <Image
            src="/icons/send.svg"
            alt="send"
            width={45}
            height={45}
            className="ml-5"
          />
        </button>
      </form>
    </div>
  );
}
