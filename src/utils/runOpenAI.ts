import { chatMessageType, userInfoType } from "types/chat";

const APIURL = "https://api.openai.com/v1/chat/completions";

export const runOpenAI = async (
  nameList: string[],
  contentList: string[],
  inputValue: string,
  chatMessageListState: chatMessageType[],
  setChatMessageListState: (answer: any) => void,
  userInfo: userInfoType
) => {
  const messageData = [
    {
      role: "system",
      content: `Given the following extracted parts of a long document and a question, create a final answer.
  If you don't know the answer, just say that you don't know. Don't try to make up an answer.`,
    },
    {
      role: "user",
      content: inputValue + "에 대해 말해줘",
    },
  ];
  if (userInfo.name !== "" && userInfo.drug !== "") {
    messageData.push({
      role: "system",
      content: `사용자 정보를 말해줄게. 사용자는 ${userInfo.name}이고, ${userInfo.drug}을(를) 복용하고 있어.}`,
    });
  }

  // 필요한 데이터 넣기
  const findDrugIndex = nameList.findIndex((name: string) =>
    name.includes(inputValue)
  );
  const findDrug = contentList[findDrugIndex];

  if (findDrug) messageData.push({ role: "system", content: findDrug });

  const response = await fetch(APIURL, {
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: messageData as any,
      max_tokens: 200,
      temperature: 0.7,
      stream: true,
      top_p: 1,
      presence_penalty: 0,
      n: 1,
      frequency_penalty: 0,
    }),

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
  });
  if (!response.body) return;
  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let isFirst = true;
  while (true) {
    const chunk = await reader.read();
    const { done, value } = chunk;
    if (done) break;
    const decodedCunk = decoder.decode(value);
    const lines = decodedCunk.split("\n");
    const parse = lines.map((line) => line[0]);
    const parsedLines = lines
      .map((line) => line.replace(/^data: /, "").trim())
      .filter((line) => line !== "" && line !== "[DONE]")
      .map((line) => JSON.parse(line));
    for (const parsedLine of parsedLines) {
      const { choices } = parsedLine;
      const { delta } = choices[0];
      const { content } = delta;
      if (content) {
        if (isFirst) {
          console.log(1);
          setChatMessageListState((prev: chatMessageType[]) => [
            ...chatMessageListState,
            { id: chatMessageListState.length + 1, message: "", isMine: false },
          ]);
          isFirst = false;
        } else {
          setChatMessageListState((prev: chatMessageType[]) => [
            ...prev.slice(0, prev.length - 1),
            {
              id: prev.length,
              message: prev[prev.length - 1].message + content,
              isMine: false,
            },
          ]);
        }
      }
    }
  }
};
