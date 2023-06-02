"use client";

import Image from "next/image";

export default function ChatInput() {
  return (
    <div className="fixed max-w-[28.125rem] bottom-0 left-0 right-0 m-auto h-[4rem] bg-[#FFF] shadow-lg flex justify-center items-center">
      <div className="bg-gradient-to-r rounded-[1.875rem] h-[2.6rem] w-[17rem] flex justify-center items-center from-[#14C8C8] via-[#D5E7F3] to-[#C1CFFF] relative">
        <input
          type="text"
          className="h-[2.5rem] w-[16.9375rem] border rounded-[1.875rem] px-[1.25rem] text-[#ACACAC]"
        />
        <Image
          src="/icons/mike.svg"
          alt="mike"
          width={20}
          height={20}
          className="absolute right-4"
        />
      </div>
      <Image
        src="/icons/send.svg"
        alt="send"
        width={45}
        height={45}
        className="ml-5"
      />
    </div>
  );
}