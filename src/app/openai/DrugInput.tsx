import { useEffect, useState } from "react";

interface autoDatas {
  //api를 통해 받아온 데이터 interface
  city: string;
  growth_from_2000_to_2013: string;
  latitude: number;
  longitude: number;
  population: string;
  rank: string;
  state: string;
}

interface ICity {
  includes(data: string): boolean;
  city?: any;
}
function Header() {
  const [keyItems, setKeyItems] = useState<autoDatas[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const fetchData = () => {
    return fetch(
      `https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json`
    )
      .then((res) => res.json())
      .then((data) => data.slice(0, 100));
  };

  const updateData = async () => {
    const res = await fetchData();
    let b = res
      .filter((list: ICity) => list.city.includes(keyword) === true)
      .slice(0, 10);
    console.log(b);
    setKeyItems(b);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (keyword) updateData();
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [keyword]); //키워드가 변경되면 api
  를 호출
  return (
    <div>
      <input
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
      <div>
        {keyItems.map((keyItem:autoDatas,id:number) => (
          <div key={id}>{keyItem.city}</div>
        ))}
      </div>
    </div>
  );
}
export default Header;
