import { ChatOpenAI } from "langchain/chat_models/openai";

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

export const model = new ChatOpenAI({
  openAIApiKey: OPENAI_API_KEY,
  streaming: true,
  temperature: 0.7,
});
