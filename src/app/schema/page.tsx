"use client";

import { chat } from "@/lib/chat";
import { CallbackManager } from "langchain/callbacks";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage } from "langchain/schema";
import React from "react";

export default function Test() {
  const call = async () => {
    const response = await chat.call([
      new HumanChatMessage("나 배가 아파. 약 뭐먹어야 돼?"),
    ]);
    console.log(response);
  };
  call();
  return <div>test</div>;
}
