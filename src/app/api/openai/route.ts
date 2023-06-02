import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { NextResponse } from "next/server";
const fs = require("fs");
const { Configuration, OpenAIApi } = require("openai");
const path = require("path");
const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const upLoadFile = async () => {
  const response = await openai.createFile(
    fs.createReadStream("public/data4.jsonl"),
    "fine-tune"
  );
  return response;
};

export async function GET() {
  // upLoadFile();
  return NextResponse.json({ message: "Hello World" });
}
