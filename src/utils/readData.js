const fs = require("fs");
const path = require("path");
const savePath = path.join(__dirname, "../../public/data");
const saveFileName = path.join(savePath, "data.js");
const readData = fs.readFileSync(saveFileName);
const data = JSON.parse(readData.toString())

