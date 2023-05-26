"use client";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import ConversationPage from "./conversation";
import { useEffect } from "react";

export default function Page() {
  return (
    <>
      <ConversationPage />
      <div></div>
    </>
  );
}
