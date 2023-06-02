"use client";
import ChatMessage from "@components/chatMessage";
import ChatInput from "./chatInput";

export default function Page() {
  return (
    <div>
      <ChatMessage
        message={`안녕하세요.\nAI 챗봇 알다입니다. \n약 이름을 입력 해주세요.  `}
        isMine={true}
      />
      <ChatMessage message={`타이레놀`} isMine={true} />
      <ChatInput />
    </div>
  );
}
