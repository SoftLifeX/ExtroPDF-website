import DocumentsPage from "@/components/account/DocumentsPage";
import { Metadata } from "next";
import React from "react";
import { PORT } from "../layout";

export const metadata: Metadata = {
  title: "Documents - ExtroPDF - Smart AI powered Document conversion Assistant.",
  description:
    "Chat with your documents using advanced AI. Extract insights, summarize, and interact with your PDFs intelligently.",
  keywords:
    "AI PDF chat, document AI, smart PDF assistant, AI-powered document analysis",

  alternates: {
    canonical: `${PORT}/documents`,
  },
};
const page = () => {
  return <DocumentsPage />;
};

export default page;
