import "@utils/entrypoints.js";
import { use, useEffect } from "react";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { similarity } from "ml-distance";
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
import { CSVLoader } from "langchain/document_loaders/fs/csv";

async function fetchTodo() {
  const loader = new CSVLoader("public/data.csv");
  const docs = await loader.load();
  return docs;
}

const run = async () => {
  const docs = await fetchTodo();
  console.log(docs);
  // const vectorStore = await MemoryVectorStore.fromTexts(
  //   ["Guesung", "Hyunjin", "GueHyeok"], //texts,string[]
  //   [{ id: 1 }, { id: 2 }, { id: 3 }], //metadatas, object
  //   new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY }), //embeddings, Embeddings
  //   { similarity: similarity.pearson } // dbConfig
  // );
  // const resultOne = await vectorStore.similaritySearch("who is id=3?", 1);
  // console.log(resultOne);
};

export default async function ConversationPage() {
  try {
    const docs = await fetchTodo();
    console.log(docs);
  } catch (error) {
    console.log(error);
  }
  console.log(1);

  return <div>dd</div>;
}
