import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { NextResponse } from "next/server";

const fs = require("fs");
const path = require("path");

export async function GET() {
  const loader = new CSVLoader("public/data/data.csv");
  const docs = await loader.load();
  return NextResponse.json(docs);
}
