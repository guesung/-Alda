import { Dispatch, SetStateAction, useEffect, useState } from "react";
interface propsType {
  nameList: string[];
  drugInput: string;
  setDrugInput: Dispatch<SetStateAction<string>>;
}
function Header({ nameList, drugInput, setDrugInput }: propsType) {
  const [autoCompleteWordList, setAutoCompleteWordList] = useState<string[]>(
    []
  );
  const [keywordIndex, setKeywordIndex] = useState<number>(0);

  console.log(keywordIndex);

  const updateData = () => {
    const b = nameList.filter((name) => name.includes(drugInput));
    setAutoCompleteWordList(b);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (drugInput) updateData();
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [drugInput]);

  const controlKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // console.log(e.keyCode)
    switch (e.keyCode) {
      case 38: // UP
        if (keywordIndex === 0) break;
        setKeywordIndex((keywordIndex) => keywordIndex - 1);
        break;
      case 40: // DOWN
        if (keywordIndex >= autoCompleteWordList.length - 1) break;
        setKeywordIndex((keywordIndex) => keywordIndex + 1);
        break;
      case 13: // ENTER
        setKeywordIndex(0);
        break;
    }
  };
  return (
    <div>
      <input
        id="search"
        onChange={(e) => {
          setDrugInput(e.target.value);
        }}
        defaultValue={"세크로정"}
        type="text"
        onKeyUp={controlKeyUp}
      />
      <div>
        {autoCompleteWordList.map((word: string, id: number) => (
          <div key={id}>{word}</div>
        ))}
      </div>
    </div>
  );
}
export default Header;
