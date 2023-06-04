import { drugType } from "types/chat";
import ChatInput from "./ChatInput";
import ChatMessageList from "./ChatMessageList";
import Header from "./Header";

const DRUG_JSON_DATA_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/get-data`;

async function getJSONData(num: number) {
  try {
    const res = await fetch(DRUG_JSON_DATA_URL + "?page=" + num);
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
    "부작용 대처법",
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
  const drugDatabase: drugType[] = [];
  for (let i = 1; i <= 5; i++) {
    const res = await getJSONData(i);
    drugDatabase.push(...res);
  }

  return (
    <div className="overflow-scroll">
      <Header />
      <ChatMessageList
        chatMessageListProps={CHAT_MESSAGE_LIST}
        userInfoProps={USER_INFO}
        drugDatabase={drugDatabase}
      />
      <ChatInput drugDatabase={drugDatabase} />
      <div className="h-20" />
    </div>
  );
}
