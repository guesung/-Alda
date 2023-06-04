import ChatInput from "./ChatInput";
import ChatMessageList from "./ChatMessageList";
import Header from "./Header";
import { openData } from "constants/openData";

const DRUG_DATA_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/get-data`;
const DRUG_JSON_DATA_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/get-json-data`;
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

async function getJSONData() {
  try {
    const res = await fetch(DRUG_JSON_DATA_URL);
    return res.json();
  } catch (error) {
    return error;
  }
}

const USER_INFO = {
  name: "알다",
  drug: "",
  selectQuestionList: [
    "복용 방법과 시간",
    "피해야 할 약, 음식",
    "부작용 대법",
    "보관 방법",
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

  const apiData = await getJSONData();
  console.log(apiData);

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
