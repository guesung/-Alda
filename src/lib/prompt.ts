import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  PromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";

export const promptInformation = PromptTemplate.fromTemplate(
  "이 {약} 무슨 용도로 쓰는 약이야?"
);

export const promptSideEffect =
  PromptTemplate.fromTemplate("이 {약} 부작용을 알려줘");

export const promptHelper = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    "당신은 환자들에게 약에 대해 알려줄 수 있는 의사입니다."
  ),
  HumanMessagePromptTemplate.fromTemplate(
    "저는 약에 대해 잘 모르는 환자입니다."
  ),
]);
