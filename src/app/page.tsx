"use client";
import "@utils/entrypoints.js";

import { model } from "@utils/chat";
import { loadQAMapReduceChain } from "@utils/entrypoints.js";
import axios from "axios";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { useRef, useState } from "react";
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const embedding = new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY });

export default function Page() {
  const [botMessage, setBotMessage] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const runQAMapReduceChain = async (question: string) => {
    const { data } = await axios.get("/api/get-data");
    const chain = loadQAMapReduceChain(model);
    const docs = data
      .map((it: any) => new Document({ pageContent: it.pageContent }))
      .slice(0, 10);

    console.log(docs);
    const res = await chain.call(
      {
        input_documents: docs,
        question,
      },
      [
        {
          handleLLMNewToken: async (token: any) =>
            setBotMessage((message) => message + token),
        },
      ]
    );
    console.log({ res });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!inputRef.current) return;
          runQAMapReduceChain("주어진 자료에서 " + inputRef.current.value);
        }}
      >
        <input
          ref={inputRef}
          defaultValue={"세크로정이라는 약물의 유의사항에 대해 알려줘"}
          width={500}
          type="text"
        />
        <button >Click to run a chain</button>
      </form>
      <div>{botMessage}</div>
    </div>
  );
}
