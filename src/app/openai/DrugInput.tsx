import { useEffect, useState } from "react";
interface propsType {
  nameList: string[];
}
function Header({ nameList }: propsType) {
  const [autoCompleteWord, setAutoCompleteWord] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>("");

  const updateData = () => {
    const b = nameList.filter((name) => name.includes(keyword));
    setAutoCompleteWord(b);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (keyword) updateData();
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [keyword]);

  return (
    <div>
      <input
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
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
