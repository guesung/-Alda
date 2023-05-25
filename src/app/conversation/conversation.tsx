// const fs = require("fs");
import * as fs from "fs";

import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { model } from "@utils/chat";

const makeDocs = async () => {
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
  });

  const docs = await textSplitter.createDocuments(["abac"]);
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever()
  );
};

// makeDocs();

export const run = async () => {
  // const text = await fs.readFileSync("./state_of_the_union.txt", "utf8");
  const text = "text";
  console.log(text);
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = await textSplitter.createDocuments([text]);
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever()
  );
  const question = "What did the president say about Justice Breyer?";
  const res = await chain.call({ question, chat_history: [] });
  console.log(res);
  /* Ask it a follow up question */
  const chatHistory = question + res.text;
  const followUpRes = await chain.call({
    question: "Was that nice?",
    chat_history: chatHistory,
  });
  console.log(followUpRes);
};
run();

export default function ConversationPage() {
  return <div>dd</div>;
}
