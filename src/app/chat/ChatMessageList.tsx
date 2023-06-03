"use client";

import ChatMessage from "@components/chatMessage";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { chatMessageListState, userInfoState } from "store";
import { chatMessageType, userInfoType } from "types/chat";
import SelectMessage from "./SelectMessage";

interface PropsType {
  chatMessageListProps: chatMessageType[];
  userInfoProps: userInfoType;
  nameList: string[];
  contentList: string[];
}

export default function ChatMessageList({
  chatMessageListProps,
  userInfoProps,
  nameList,
  contentList,
}: PropsType) {
  const [chatMessageList, setChatMessageList] =
    useRecoilState(chatMessageListState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    setChatMessageList(chatMessageListProps);
    setUserInfo(userInfoProps);
  }, [chatMessageListProps, setChatMessageList, setUserInfo, userInfoProps]);

  return (
    <article>
      {chatMessageList.map((chatMessage: chatMessageType, index: number) => {
        if (
          chatMessage.isMine === false &&
          index === chatMessageList.length - 1
          // && index > 0
        )
          return (
            <div key={chatMessage.id}>
              <ChatMessage
                message={chatMessage.message}
                isMine={chatMessage.isMine}
                key={chatMessage.id}
              />
              <SelectMessage nameList={nameList} contentList={contentList} />
            </div>
          );
        return (
          <ChatMessage
            message={chatMessage.message}
            isMine={chatMessage.isMine}
            key={chatMessage.id}
          />
        );
      })}
    </article>
  );
}
