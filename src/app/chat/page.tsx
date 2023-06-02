import ChatInput from "./ChatInput";
import ChatMessageList from "./ChatMessageList";
import Header from "./Header";
const GETDATAURL = `${process.env.NEXT_PUBLIC_API_URL}/api/get-data`;

interface csvDataType {
  metaData: {
    source: string;
    line: number;
  };
  pageContent: string;
}

async function getData() {
  const res = await fetch(GETDATAURL);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const CHAT_MESSAGE_LIST = [
  {
    id: 1,
    message: "안녕하세요.\nAI 챗봇 알다입니다. \n약 이름을 입력 해주세요.  ",
    isMine: false,
  },
];

export default async function Page() {
  const data = await getData();
  const contentList: string[] = data.map((it: csvDataType) => it.pageContent);
  const nameList: string[] = data.map(
    (it: csvDataType) => it.pageContent.split("\n")[3].split(":")[1]
  );

  return (
    <div>
      <Header />
      <ChatMessageList chatMessageListProps={CHAT_MESSAGE_LIST} />

      <ChatInput nameList={nameList} contentList={contentList} />
    </div>
  );
}
