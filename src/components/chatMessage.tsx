interface PropsType {
  message: string;
}

export default function ChatMessage({ message }: PropsType) {
  return <div className="h-[100dvh] bg-black">{message}</div>;
}
