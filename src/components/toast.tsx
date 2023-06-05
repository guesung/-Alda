"use client";
import Image from "next/image";
import "tailwindcss/tailwind.css";

interface PropsType {
  message: string;
}

export default function Toast({ message }: PropsType) {
  return (
    <div className="fixed bottom-[4rem] p-6 px-6 py-4 rounded-[2.5rem] opacity-70 shadow-md text-[#FFF] bg-[#262626] flex justify-center w-[19.5rem] h-[2.625rem] text-center animate-slide-up  items-center">
      <Image
        alt="alert"
        src="/icons/alert.svg"
        width={20}
        height={20}
        className="absolute left-[4.3rem] "
      />
      <div className="w-[80%]">{message}</div>
    </div>
  );
}
