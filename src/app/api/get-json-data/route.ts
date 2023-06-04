import { NextResponse } from "next/server";

const fs = require("fs");
const path = require("path");

export async function GET() {
  const saveFileName = path.join("public/data/data.js");
  const readData = fs.readFileSync(saveFileName);
  return NextResponse.json(JSON.parse(readData.toString()));
}
