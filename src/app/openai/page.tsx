"use client";

import axios from "axios";
import { Configuration, OpenAIApi } from "openai";
import { use, useEffect, useState } from "react";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

interface csvDataType {
  metaData: {
    source: string;
    line: number;
  };
  pageContent: string;
}

const createChatCompletion = async (database:csvDataType[], inputValue: string) => {
  const contentList = database.map((it: csvDataType) => it.pageContent);
  const nameList = contentList.map(
    (it: string) => it.split("\n")[3].split(":")[1]
  );
  const messageData = [
    {
      role: "system",
      content: `Given the following extracted parts of a long document and a question, create a final answer.
  If you don't know the answer, just say that you don't know. Don't try to make up an answer.`,
    },
    {
      role: "user",
      content: inputValue + "약의 유의사항을 알려줘",
    },
  ];

  // 필요한 데이터 넣기
  const findDrugIndex = nameList.findIndex((name: string) =>
    name.includes(inputValue)
  );
  const findDrug = contentList[findDrugIndex];

  messageData.push({ role: "system", content: findDrug });

  console.log(messageData);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messageData as any,
  });
  console.log(completion.data.choices[0].message);
};

export default function Page() {
  const [drugInput, setDrugInput] = useState<string>("");
  const [database, setDatabase] = useState<csvDataType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios("/api/get-data");
      setDatabase(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createChatCompletion(database, drugInput);
        }}
      >
        <input
          defaultValue={"세크로정"}
          width={500}
          type="text"
          onChange={(e) => setDrugInput(e.target.value)}
        />
        <button>Click to run a chain</button>
      </form>
    </div>
  );
}
