"use client";

import Toast from "@components/toast";
import { runOpenAI } from "@utils/runOpenAI";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { chatMessageListState, isTypingState, userInfoState } from "store";

interface PropsType {
  drugDatabase: any[];
}

export default function ChatInput({ drugDatabase }: PropsType) {
  const [input, setInput] = useState<string>("");
  const [autoCompleteWordList, setAutoCompleteWordList] = useState<string[]>(
    []
  );
  const [toastMessage, setToastMessage] = useState<string>("");

  const [isTyping, setIsTyping] = useRecoilState(isTypingState);
  const [chatMessageList, setChatMessageList] =
    useRecoilState(chatMessageListState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (input)
        setAutoCompleteWordList(
          drugDatabase.filter((drug) => drug.itemName.includes(input))
        );
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [input, drugDatabase]);

  useEffect(() => {
    if (toastMessage.length > 0) {
      setTimeout(() => {
        setToastMessage("");
      }, 2000);
    }
  }, [toastMessage]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (input === "") {
      return;
    }
    if (userInfo.drug === "") {
      setToastMessage("약을 선택해주세요.");
      return;
    }
    if (isTyping) {
      setToastMessage("답변이 끝난 뒤 시도해 주세요.");
      return;
    }
    setIsTyping(true);
    setAutoCompleteWordList([]);

    setChatMessageList((chatMessageList) => [
      ...chatMessageList,
      {
        type: "message",
        id: chatMessageList.length + 1,
        message: input,
        isMine: true,
      },
    ]);

    const inputSave = input;
    setInput("");
    await runOpenAI({
      drugDatabase,
      inputValue: inputSave,
      chatMessageListState: [
        ...chatMessageList,
        {
          type: "message",
          id: chatMessageList.length + 1,
          message: inputSave,
          isMine: true,
        },
      ],
      setChatMessageListState: setChatMessageList,
      userInfo,
    });
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
        drug: word,
      });
    }
    await runOpenAI({
      drugDatabase,
      inputValue: word,
      chatMessageListState: [
        ...chatMessageList,
        {
          type: "message",
          id: chatMessageList.length + 1,
          message: word,
          isMine: true,
        },
      ],
      setChatMessageListState: setChatMessageList,
      userInfo,
    });
    setIsTyping(false);
  };

  const heightValue = `${Math.min(autoCompleteWordList.length, 4) * 3.125}rem`;

  return (
    <div className="fixed bottom-0 left-0 right-0 m-auto h-[4rem] bg-[#FFF] max-w-[28.125rem] shadow-lg flex justify-center items-center">
      {toastMessage.length > 0 && <Toast message={toastMessage} />}
      <div
        className="absolute overflow-scroll w-full"
        style={{ top: `-${heightValue}`, height: `${heightValue}` }}
      >
        {input.length > 0 &&
          userInfo.drug === "" &&
          autoCompleteWordList.map((drug: any, index: number) => (
            <p
              onClick={() => {
                handleAutoCompleteClick(drug.itemName);
              }}
              key={index}
              className="h-[3.125rem] flex items-center border-t border-[#EEE] px-5 text-[#707478]"
            >
              {drug.itemName}
            </p>
          ))}
      </div>
      <form className="flex" onSubmit={handleSubmit}>
        <div className="bg-gradient-to-r rounded-[1.875rem] max-h-[2.6rem] flex justify-center items-center from-[#14C8C8] via-[#D5E7F3] to-[#C1CFFF] relative">
          <input
            type="text"
            className="h-[2.5rem]  border rounded-[1.875rem] px-[1.25rem] text-[#34363C] placeholder-[#ACACAC] focus:outline-none"
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
            src={`/icons/send${input.length > 0 ? "_focus" : ""}.svg`}
            alt="send"
            width={40}
            height={40}
            className="ml-5"
          />
        </button>
      </form>
      {/* <AudiodioRecord /> */}
    </div>
  );
}
