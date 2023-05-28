import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { NextResponse } from "next/server";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const embedding = new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY });

export async function GET() {
  const loader = new CSVLoader("public/data.csv");
  const docs = await loader.load();
  return NextResponse.json(docs);
}
