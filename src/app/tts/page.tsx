"use client";

import { useState } from "react";

export default function Page() {
  const msg = new SpeechSynthesisUtterance("안녕하세요 저는 박규성입니다.");
  const speechHandler = (msg: any) => {
    window.speechSynthesis.speak(msg);
  };

  return (
    <div>
      <button onClick={() => speechHandler(msg)}>SPEAK</button>
    </div>
  );
}
