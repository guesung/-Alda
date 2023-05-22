import { CallbackManager } from "langchain/callbacks";
import { ChatOpenAI } from "langchain/chat_models/openai";
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

export const chat = new ChatOpenAI({
  openAIApiKey: OPENAI_API_KEY,
  streaming: true,
  callbackManager: CallbackManager.fromHandlers({
    handleLLMNewToken: async (token) => console.log("handleLLMNewToken", token),
  }),
});
