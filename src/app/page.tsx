"use client";
import "@utils/entrypoints.js";

import { model } from "@utils/chat";
import { loadQAMapReduceChain } from "@utils/entrypoints.js";
import { promptHelper } from "@utils/prompt";
import axios from "axios";
import { LLMChain } from "langchain/chains";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { EntityMemory } from "langchain/memory";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { useRef, useState } from "react";

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const runMemoryVectorStore = async () => {
  const { data: docs } = await axios.get("/api/conversation");
  const vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY })
  );
  console.log(vectorStore);
  const resultOne = await vectorStore.similaritySearch(
    "아세티론정의 정보에 대해 알려줘",
    1
  );
  console.log(resultOne);
  return resultOne;
};

export default function Page() {
  const [botMessage, setBotMessage] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const runLLMChain = async () => {
    const memory = new EntityMemory({
      llm: model,
      chatHistoryKey: "history",
      entitiesKey: "entities",
    });

    const chain = (promptType: any) => {
      return new LLMChain({
        llm: model,
        prompt: promptType,
        memory,
      });
    };

    const res = await chain(promptHelper).call(
      {
        text: "나 배가 아파. 약 뭐먹어야 돼?",
      },
      [
        {
          handleLLMNewToken: async (token: any) =>
            setBotMessage((message) => message + token),
        },
      ]
    );
    console.log(res);
  };

  const runQAMapReduceChain = async (question: string) => {
    const { data } = await axios.get("/api/getData");
    const chain = loadQAMapReduceChain(model);
    const docs = data
      .map((it: any) => new Document({ pageContent: it.pageContent }))
      .slice(0, 10);

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
          runQAMapReduceChain(inputRef.current.value);
        }}
      >
        <input
          ref={inputRef}
          defaultValue={"아세티론정이라는 약물의 유의사항에 대해 알려줘"}
          width={500}
          type="text"
        />
        <button>Click to run a chain</button>
      </form>
      <div>{botMessage}</div>
    </div>
  );
}
