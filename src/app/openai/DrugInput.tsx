import { Dispatch, SetStateAction, useEffect, useState } from "react";
interface propsType {
  nameList: string[];
  drugInput: string;
  setDrugInput: Dispatch<SetStateAction<string>>;
}
function Header({ nameList, drugInput, setDrugInput }: propsType) {
  const [autoCompleteWord, setAutoCompleteWord] = useState<string[]>([]);

  const updateData = () => {
    const b = nameList.filter((name) => name.includes(drugInput));
    setAutoCompleteWord(b);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (drugInput) updateData();
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [drugInput]);

  return (
    <div>
      <input
        onChange={(e) => {
          setDrugInput(e.target.value);
        }}
        defaultValue={"세크로정"}
        type="text"
      />
      <div>
        {autoCompleteWord.map((word: string, id: number) => (
          <div key={id}>{word}</div>
        ))}
      </div>
    </div>
  );
}
export default Header;
