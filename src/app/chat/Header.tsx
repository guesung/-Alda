"use client";

import { getDeviceType } from "@utils/getDeviceType";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [deviceType, setDeviceType] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDeviceType(getDeviceType());
    }
  }, []);

  return deviceType !== "unknown" ? (
    <div></div>
  ) : (
    <header className="h-[3.5rem] flex justify-center items-center relative">
      <p className="text-[1.25rem]">알다와 대화중</p>
      <Image
        alt="home"
        src="/icons/close.svg"
        width={15}
        height={15}
        className="absolute right-0"
      />
    </header>
  );
}
