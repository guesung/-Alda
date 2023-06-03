import ChatMessageList from "./ChatMessageList";
import Header from "./Header";
import ChatInput from "./ChatInput";
import { database } from "@utils/firebase";
import { onValue, ref } from "firebase/database";

const DRUG_DATA_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/get-data`;
const USER_INFO_URL = `${process.env.NEXT_PUBLIC_FIREBASE_URL}`;

interface csvDataType {
  metaData: {
    source: string;
    line: number;
  };
  pageContent: string;
}

async function getDrugData() {
  try {
    const res = await fetch(DRUG_DATA_URL);
    return res.json();
  } catch (error) {
    return error;
  }
}

const USER_INFO = {
  name: "알다",
  drug: "",
  selectQuestion: [
    "효능",
    "복용 방법과 시간",
    "피해야 할 음식, 약물",
    "주의사항",
  ],
};

const CHAT_MESSAGE_LIST = [
  {
    id: 1,
    message: "안녕하세요.\nAI 챗봇 알다입니다. \n약 이름을 입력 해주세요.  ",
    isMine: false,
  },
];

export default async function Page() {
  const drugData = await getDrugData();
  const contentList: string[] = drugData.map(
    (it: csvDataType) => it.pageContent
  );
  const nameList: string[] = drugData.map(
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
