"use client";

import { makeTTS } from "@utils/makeTTS";

export default function Page() {
  return (
    <div>
      <button onClick={() => makeTTS("안녕하세요, 저는 박규성입니다.")}>
        SPEAK
      </button>
    </div>
  );
}
