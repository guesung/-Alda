interface PropsType {
  message: string;
  isMine?: boolean;
}

export default function ChatMessage({ message }: PropsType) {
  return (
    <p className="px-4 py-2 bg-[#F3F6FF]  max-w-[15rem] rounded-r-[1.25rem] rounded-bl-[1.25rem] whitespace-pre-wrap inline-block">
      {message}
    </p>
  );
}
