const CSVLoader = require('langchain/document_loaders/fs/csv').CSVLoader;
const fs = require('fs')

const csvToJsonl = async () => {
  const loader = new CSVLoader("public/data.csv");
  const data = await loader.load();
  const docs = data.map(it => it.pageContent.split('\n'))
  const drugInfo = docs.map(it => it.pop())
  const returnValue = docs.map((it, index) => `{"prompt" : "${it.join(',')}", "completion" : "${drugInfo[index]}"}`).join('\n')
  fs.writeFileSync('public/data3.jsonl', returnValue)
}
csvToJsonl();