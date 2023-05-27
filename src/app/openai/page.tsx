"use client";

import axios from "axios";

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default function Page() {
  const run = async () => {
    const { data } = await axios.get("api/get-data");
    const docs = data.map((it: any) => it.pageContent).slice(0, 10);
    console.log(docs);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "너 이름이 뭐야?",
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    });
    console.log(response);
  };
  return (
    <div>
      hello<button onClick={run}>클릭</button>
    </div>
  );
}
