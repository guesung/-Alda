"use client";

import axios from "axios";
import { Configuration, OpenAIApi } from "openai";
import { use, useEffect, useState } from "react";
import DrugInput from "./DrugInput";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const APIURL = "https://api.openai.com/v1/chat/completions";
const openai = new OpenAIApi(configuration);

interface csvDataType {
  metaData: {
    source: string;
    line: number;
  };
  pageContent: string;
}

const createChatCompletion = async (
  nameList: string[],
  contentList: string[],
  inputValue: string,
  setAnswer: (answer: any) => void
) => {
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

  const response = await fetch(APIURL, {
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: messageData as any,
      max_tokens: 200,
      temperature: 0.7,
      stream: true,
      top_p: 1,
      presence_penalty: 0,
      n: 1,
      frequency_penalty: 0,
    }),

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
  });
  if (!response.body) return;
  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  while (true) {
    const chunk = await reader.read();
    const { done, value } = chunk;
    if (done) break;
    const decodedCunk = decoder.decode(value);
    const lines = decodedCunk.split("\n");
    const parse = lines.map((line) => line[0]);
    const parsedLines = lines
      .map((line) => line.replace(/^data: /, "").trim())
      .filter((line) => line !== "" && line !== "[DONE]")
      .map((line) => JSON.parse(line));
    for (const parsedLine of parsedLines) {
      const { choices } = parsedLine;
      const { delta } = choices[0];
      const { content } = delta;
      if (content) setAnswer((answer: string) => answer + content);
    }
  }
};

export default function Page() {
  const [drugInput, setDrugInput] = useState<string>("");
  const [contentList, setContentList] = useState<string[]>([]);
  const [nameList, setNameList] = useState<string[]>([]);
  const [autoFill, setAutoFill] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios("/api/get-data");
      setContentList(data.map((it: csvDataType) => it.pageContent));
      setNameList(
        data.map(
          (it: csvDataType) => it.pageContent.split("\n")[3].split(":")[1]
        )
      );
    };
    fetchData();
  }, []); // 종속성 배열에서 contentList를 제거

  useEffect(() => {
    if (drugInput.length > 0) {
      const findDrugIndex = nameList.findIndex((it: string) =>
        it.includes(drugInput)
      );
      if (findDrugIndex) {
        setAutoFill(contentList[findDrugIndex]);
      }
    } else {
      setAutoFill("");
    }
  }, [drugInput, nameList, contentList]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createChatCompletion(nameList, contentList, drugInput, setAnswer);
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
      <div>{autoFill}</div>
      <div>{answer}</div>

      <DrugInput nameList={nameList} />
    </div>
  );
}
