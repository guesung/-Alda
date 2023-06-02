"use client";

import axios from "axios";
import { Configuration, OpenAIApi } from "openai";
import { use, useEffect, useState } from "react";
import DrugInput from "./DrugInput";
import { runOpenAI } from "@utils/runOpenAI";

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

export default function Page() {
  const [drugInput, setDrugInput] = useState<string>("");
  const [contentList, setContentList] = useState<string[]>([]);
  const [nameList, setNameList] = useState<string[]>([]);
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
  }, []);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          runOpenAI(nameList, contentList, drugInput, setAnswer);
        }}
      >
        <DrugInput
          nameList={nameList}
          drugInput={drugInput}
          setDrugInput={setDrugInput}
        />
        <button type="submit">Click to run a chain</button>
      </form>
      <div>{answer}</div>
    </div>
  );
}
