export const getOpenData = async ({
  url,
  serviceKey,
}: {
  url: string;
  serviceKey: string;
}) => {
  const openData: any[] = [];

  let isFinish = false;
  for (let i = 1; i < 10; i++) {
    const response = await fetch(
      `${url}?ServiceKey=${serviceKey}&type=json&numOfRows=${100}&pageNo=${i}`
    );

    if (response.ok) {
      const data = await response.json();
      const items = data.body.items;
      if (items === undefined) {
        isFinish = true;
      } else {
        openData.push(...items);
      }
    } else {
      alert("데이터 받아오던 중 에러 발생");
    }

    if (isFinish) break;
  }

  console.log(openData);
  return openData;
};
