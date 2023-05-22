import { CallbackManager } from "langchain/callbacks";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ENTITY_MEMORY_CONVERSATION_TEMPLATE,
  EntityMemory,
} from "langchain/memory";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
} from "langchain/prompts";
import { promptInformation, promptSideEffect } from "./prompt";
import { LLMChain } from "langchain/chains";

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

export const model = new ChatOpenAI({
  openAIApiKey: OPENAI_API_KEY,
  streaming: true,
  callbackManager: CallbackManager.fromHandlers({
    handleLLMNewToken: async (token) => console.log(token),
  }),
});

export const memory = new EntityMemory({
  llm: model,
  chatHistoryKey: "history",
  entitiesKey: "entities",
});

export const chain = (promptType) => {
  return new LLMChain({
    llm: model,
    // prompt: ChatPromptTemplate.fromPromptMessages([
    //   HumanMessagePromptTemplate.fromTemplate(
    //     "내 이름은 박규성이야. 사과가 뭐야?"
    //   ),
    // ]),
    // prompt: promptInformation,
    prompt: promptType,
    memory,
  });
};
