import { getOpenData } from "@utils/getOpenData";
import { NextRequest, NextResponse } from "next/server";

const fs = require("fs");
const path = require("path");

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  if (page === null) {
    return NextResponse.json({ error: "Page parameter is required" });
  } else {
    const res = await getOpenData(+page);
    return NextResponse.json(res);
  }
}
