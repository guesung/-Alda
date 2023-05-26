const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { similarity } from "ml-distance";

export const run = async () => {
  const vectorStore = await MemoryVectorStore.fromTexts(
    ["Guesung", "Hyunjin", "GueHyeok"],
    [{ id: 1 }, { id: 2 }, { id: 3 }],
    new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY }),
    { similarity: similarity.pearson }
  );

  const resultOne = await vectorStore.similaritySearch("who is id=3?", 1);
  console.log(resultOne);
};

run();
export default function ConversationPage() {
  return <div>dd</div>;
}
