import { NextRequest, NextResponse } from "next/server";

const fs = require("fs");
const path = require("path");

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const saveFileName = path.join(`public/data/data${page}.js`);
  const readData = fs.readFileSync(saveFileName);
  return NextResponse.json(JSON.parse(readData.toString()));
}
