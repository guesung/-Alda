import { PromptTemplate } from "langchain/prompts";

export const promptInformation = PromptTemplate.fromTemplate(
  "이 {약} 무슨 용도로 쓰는 약이야?"
);
export const promptSideEffect =
  PromptTemplate.fromTemplate("이 {약} 부작용을 알려줘");
