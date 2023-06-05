import SelectMessage from "@app/chat/SelectMessage";
import { TTS } from "@utils/makeTTS";
import clsx from "clsx";
import Image from "next/image";
import { chatMessageType, drugType } from "types/chat";

interface PropsType {
  chatMessage: chatMessageType;
  drugDatabase: drugType[];
}

export default function ChatMessage({
  chatMessage,
  drugDatabase,
}: PropsType): JSX.Element {
  const handleSpeaker = () => {
    if (typeof chatMessage.message !== "string") return;
    const tts = new TTS(chatMessage.message);
    if (tts.isPlaying) tts.stop();
    else tts.play();
  };

  if (chatMessage.type === "message") {
    return (
      <div
        className={clsx(
          "flex",
          chatMessage.isMine ? "flex-row-reverse" : "flex-row",
          "mb-5"
        )}
      >
        <p
          className={clsx(
            "px-[1rem] py-[0.625rem] max-w-[15rem] rounded-b-[1.25rem] whitespace-pre-wrap inline-block",
            chatMessage.isMine
              ? "bg-[#C2E4EF] rounded-tl-[1.25rem]"
              : "bg-[#F3F6FF] rounded-tr-[1.25rem]"
          )}
        >
          {chatMessage.message}
        </p>
        {!chatMessage.isMine && (
          <div className="flex flex-col-reverse ml-2">
            <Image
              alt="speaker"
              src="/icons/speaker.svg"
              width={35}
              height={35}
              onClick={handleSpeaker}
            />
          </div>
        )}
      </div>
    );
  } else {
    return <SelectMessage drugDatabase={drugDatabase} />;
  }
}
