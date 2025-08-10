import { Metadata } from "next";
import React from "react";
import { PORT } from "../layout";

export const metadata: Metadata = {
  title: "Settings - ExtroPDF - Smart AI powered Document conversion Assistant.",
  description:
    "Chat with your documents using advanced AI. Extract insights, summarize, and interact with your PDFs intelligently.",
  keywords:
    "AI PDF chat, document AI, smart PDF assistant, AI-powered document analysis",

  alternates: {
    canonical: `${PORT}/settings`,
  },
};

const page = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <h1 className="text-2xl font-semibold text-gray-600">
        This page is under construction 🚧
      </h1>
    </div>
  );
};

export default page;
