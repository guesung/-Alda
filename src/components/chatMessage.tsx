import clsx from "clsx";

interface PropsType {
  message: string;
  isMine?: boolean;
}

export default function ChatMessage({ message, isMine }: PropsType) {
  return (
    <p
      className={clsx(
        "px-[1rem] py-[0.625rem] max-w-[15rem] rounded-r-[1.25rem] rounded-bl-[1.25rem] whitespace-pre-wrap inline-block",
        isMine ? "bg-[#F3F6FF]" : "bg-[#C2E4EF]"
      )}
    >
      {message}
    </p>
  );
}
