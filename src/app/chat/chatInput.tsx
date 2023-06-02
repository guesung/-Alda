"use client";

import { runOpenAI } from "@utils/runOpenAI";
import Image from "next/image";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { chatMessageListState } from "store";

interface PropsType {
  nameList: string[];
  contentList: string[];
}

export default function ChatInput({ nameList, contentList }: PropsType) {
  const [input, setInput] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [chatMessageList, setChatMessageList] =
    useRecoilState(chatMessageListState);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setChatMessageList((chatMessageList) => [
      ...chatMessageList,
      { id: chatMessageList.length + 1, message: input, isMine: true },
    ]);
    // chat전송
    runOpenAI(
      nameList,
      contentList,
      input,
      [
        ...chatMessageList,
        { id: chatMessageList.length + 1, message: input, isMine: true },
      ],
      setChatMessageList
    );
  };
  return (
    <form
      className="fixed max-w-[28.125rem] bottom-0 left-0 right-0 m-auto h-[4rem] bg-[#FFF] shadow-lg flex justify-center items-center"
      onSubmit={handleSubmit}
    >
      <div className="bg-gradient-to-r rounded-[1.875rem] h-[2.6rem] w-[17rem] flex justify-center items-center from-[#14C8C8] via-[#D5E7F3] to-[#C1CFFF] relative">
        <input
          type="text"
          className="h-[2.5rem] w-[16.9375rem] border rounded-[1.875rem] px-[1.25rem] text-[#ACACAC]"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder="타이레놀"
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
  );
}
