import { CallbackManager } from "langchain/callbacks";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { EntityMemory } from "langchain/memory";

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

export const model = new ChatOpenAI({
  openAIApiKey: OPENAI_API_KEY,
  streaming: true,
  temperature: 0.7,
});

export const memory = new EntityMemory({
  llm: model,
  chatHistoryKey: "history",
  entitiesKey: "entities",
});

export const chain = (promptType: any) => {
  return new LLMChain({
    llm: model,
    prompt: promptType,
    memory,
  });
};
