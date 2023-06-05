import { getOpenData } from "@utils/getOpenData";
import { drugType } from "types/chat";
import ChatInput from "./ChatInput";
import ChatMessageList from "./ChatMessageList";
import Header from "./Header";

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

async function getDrugData(num: number) {
  try {
    const res = await getOpenData(num);
    return res;
  } catch (error) {
    return error;
  }
}

export default async function Page() {
  const requests = [];
  for (let i = 1; i <= 450; i++) {
    requests.push(getDrugData(i));
  }

  const drugDatabase: drugType[] = [];

  try {
    const responses = await Promise.all(requests);
    for (const res of responses) {
      drugDatabase.push(...res);
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="overflow-scroll">
      <Header />
      <ChatMessageList userInfoProps={USER_INFO} drugDatabase={drugDatabase} />
      <ChatInput drugDatabase={drugDatabase} />
      <div className="h-20" />
    </div>
  );
}
