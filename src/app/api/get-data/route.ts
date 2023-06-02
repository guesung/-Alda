import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { NextResponse } from "next/server";

export async function GET() {
  const loader = new CSVLoader("public/data.csv");
  const docs = await loader.load();
  return NextResponse.json(docs);
}
