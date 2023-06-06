"use client";

import ChatMessage from "@components/chatMessage";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { chatMessageListState, isTypingState, userInfoState } from "store";
import { chatMessageType, drugType } from "types/chat";

interface PropsType {
  drugDatabase: drugType[];
}

export default function ChatMessageList({ drugDatabase }: PropsType) {
  const [chatMessageList, setChatMessageList] =
    useRecoilState(chatMessageListState);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const userInfo = useRecoilValue(userInfoState);
  const isTyping = useRecoilValue(isTypingState);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessageList, userInfo, isTyping]);

  return (
    <article className="max-w-[28.125rem]">
      <Image
        alt="alda"
        src="/icons/alda.svg"
        width={100}
        height={100}
        className="absolute left-[6rem] top-[1.5rem] -z-1"
      />
      <div className="mt-[5.375rem] z-30 relative">
        {chatMessageList.map((chatMessage: chatMessageType) => (
          <ChatMessage
            chatMessage={chatMessage}
            drugDatabase={drugDatabase}
            key={chatMessage.id}
          />
        ))}
      </div>
      <div ref={messageEndRef}></div>
    </article>
  );
}
