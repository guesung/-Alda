"use client";

import axios from "axios";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const createChatCompletion = async () => {
  const { data } = await axios("/api/get-data");
  const contents = data.map((it: any) => it.pageContent);
  const messageData = [];
  messageData.push({
    role: "system",
    content: `Given the following extracted parts of a long document and a question, create a final answer.
  If you don't know the answer, just say that you don't know. Don't try to make up an answer.`,
  });
  for (let i = 0; i < 1; i++) {
    messageData.push({
      role: "system",
      content: contents.slice(i * 10, (i + 1) * 10).join("\n\n") + "",
    });
  }
  messageData.push({
    role: "user",
    content: "대웅바이오아세클로페낙정의 성분코드에 대해 알려줘",
  });
  console.log(messageData);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messageData as any,
  });
  console.log(completion.data.choices[0].message);
};

export default function Page() {
  return (
    <div>
      hello<button onClick={createChatCompletion}>클릭</button>
    </div>
  );
}
