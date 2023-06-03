import ChatMessageList from "./ChatMessageList";
import Header from "./Header";
import ChatInput from "./ChatInput";
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
  // 추후 firebase 데이터(SSG로 받아오기)로 교체 예정
  {
    id: 1,
    message: "안녕하세요.\nAI 챗봇 알다입니다. \n약 이름을 입력 해주세요.  ",
    isMine: false,
  },
];

const USER_INFO = {
  // 추후 firebase 데이터(SSG로 받아오기)로 교체 예정
  name: "알다",
  drug: "",
  selectQuestion: [
    "효능",
    "복용 방법과 시간",
    "피해야 할 음식, 약물",
    "주의사항",
  ],
};

export default async function Page() {
  const data = await getData();
  const contentList: string[] = data.map((it: csvDataType) => it.pageContent);
  const nameList: string[] = data.map(
    (it: csvDataType) => it.pageContent.split("\n")[3].split(":")[1]
  );

  return (
    <div className="overflow-scroll">
      <Header />
      <ChatMessageList
        chatMessageListProps={CHAT_MESSAGE_LIST}
        userInfoProps={USER_INFO}
        nameList={nameList}
        contentList={contentList}
      />
      <ChatInput nameList={nameList} contentList={contentList} />
      <div className="h-20" />
    </div>
  );
}
