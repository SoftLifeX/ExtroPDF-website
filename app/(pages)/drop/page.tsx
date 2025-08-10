import DropPage from "@/components/account/DropPage";
import React from "react";
import { PORT } from "../layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DropZone - ExtroPDF - Smart AI powered Document conversion Assistant.",
  description:
    "Chat with your documents using advanced AI. Extract insights, summarize, and interact with your PDFs intelligently.",
  keywords:
    "AI PDF chat, document AI, smart PDF assistant, AI-powered document analysis",

  alternates: {
    canonical: `${PORT}/drop`,
  },
};

const page = () => {
  return <DropPage />;
};

export default page;
