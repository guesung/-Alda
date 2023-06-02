"use client";

import ChatMessage from "@components/chatMessage";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { chatMessageListState } from "store";
import { chatMessageType } from "types/chat";

interface PropsType {
  chatMessageListProps: chatMessageType[];
}

export default function ChatMessageList({ chatMessageListProps }: PropsType) {
  const [chatMessageList, setChatMessageList] =
    useRecoilState(chatMessageListState);
  useEffect(() => {
    setChatMessageList(chatMessageListProps);
  }, []);

  return (
    <article>
      {chatMessageList.map((chatMessage) => (
        <ChatMessage
          message={chatMessage.message}
          isMine={chatMessage.isMine}
          key={chatMessage.id}
        />
      ))}
    </article>
  );
}
