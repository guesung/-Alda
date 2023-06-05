const fs = require("fs");
const path = require("path");

export const getOpenData = async (page: number) => {
  const response = await fetch(
    `${"http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList"}?ServiceKey=${"dLIzfarVErjrIRr1G76y2ayIhVjZy4xWEcgncqSmGas%2BxJXxSVR4oEGCegUszVf6iBHXUakRT4Rho6MEvlSv6g%3D%3D"}&type=json&pageNo=${page}&numOfRows=${10}`
  );

  if (response.ok) {
    const data = await response.json();
    const items = data.body.items;
    return items;
  } else {
    alert("데이터 받아오던 중 에러 발생");
  }
};
