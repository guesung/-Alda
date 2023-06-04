const fs = require("fs");
const path = require("path");

const getOpenData = async () => {
  const openData = [];

  let isFinish = false;
  for (let i = 1; i < 3; i++) {
    const response = await fetch(
      `${"http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList"}?ServiceKey=${"dLIzfarVErjrIRr1G76y2ayIhVjZy4xWEcgncqSmGas%2BxJXxSVR4oEGCegUszVf6iBHXUakRT4Rho6MEvlSv6g%3D%3D"}&type=json&itemName=타이레놀`
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
  const savePath = path.join(__dirname, "../../public/data");
  const saveFileName = path.join(savePath, "data.js");
  fs.writeFileSync(saveFileName, JSON.stringify(openData));
  console.log(openData);
  return openData;
};

getOpenData();
