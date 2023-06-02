"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="h-[3.5rem] flex justify-center items-center relative">
      <p className="text-[1.25rem]">알다와 대화중</p>
      <Image
        alt="home"
        src="/icons/home.svg"
        width={40}
        height={40}
        className="absolute right-0"
      />
    </header>
  );
}
