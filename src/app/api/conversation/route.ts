import { CSVLoader } from "langchain/document_loaders/fs/csv";
import "@utils/entrypoints.js";

import { use, useEffect } from "react";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { similarity } from "ml-distance";
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
import axios from "axios";
import { NextResponse } from "next/server";

const run = async () => {
  const loader = new CSVLoader("public/data.csv", "id");
  const docs = await loader.load();

  console.log(docs);

  // const vectorStore = await MemoryVectorStore.fromDocuments(
  //   docs, //metadatas, object
  //   new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY }), //embeddings, Embeddings
  //   { similarity: similarity.pearson } // dbConfig
  // );
  // const resultOne = await vectorStore.similaritySearch("who is id=1?", 1);
  // console.log(resultOne);

  return docs;
};

export async function GET(request: Request) {
  const result = await run();
  console.log(result);

  return NextResponse.json(result);
}
