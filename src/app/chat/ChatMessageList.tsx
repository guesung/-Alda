"use client";

import ChatMessage from "@components/chatMessage";

import Image from "next/image";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { chatMessageListState, userInfoState } from "store";
import { chatMessageType, userInfoType } from "types/chat";
import SelectMessage from "./SelectMessage";
import { getOpenData } from "@utils/getOpenData";

interface PropsType {
  chatMessageListProps: chatMessageType[];
  userInfoProps: userInfoType;
  nameList: string[];
  contentList: string[];
}

const EncodingKey =
  "dLIzfarVErjrIRr1G76y2ayIhVjZy4xWEcgncqSmGas%2BxJXxSVR4oEGCegUszVf6iBHXUakRT4Rho6MEvlSv6g%3D%3D";
const decodingKey =
  "dLIzfarVErjrIRr1G76y2ayIhVjZy4xWEcgncqSmGas+xJXxSVR4oEGCegUszVf6iBHXUakRT4Rho6MEvlSv6g==";

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

  const doA = async () => {
    const a = await getOpenData({
      url: "http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList",
      serviceKey: EncodingKey,
    });
    console.log(a);
  };

  useEffect(() => {
    doA();
  }, []);

  return (
    <article>
      {chatMessageList.map((chatMessage: chatMessageType, index: number) => {
        if (index === 0)
          return (
            <div key={chatMessage.id} className="relative">
              <Image
                alt="alda"
                src="/icons/alda.svg"
                width={100}
                height={100}
                className="absolute left-[5rem] bottom-[2.7rem] -z-1"
              />
              <div className="mt-20 relative">
                <ChatMessage
                  message={chatMessage.message}
                  isMine={chatMessage.isMine}
                />
              </div>
            </div>
          );
        if (
          chatMessage.isMine === false &&
          index === chatMessageList.length - 1 &&
          index > -1
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
