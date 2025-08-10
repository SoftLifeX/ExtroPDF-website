import { PORT } from "@/app/(pages)/layout";
import { SignUpForm } from "@/components/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "signUp - ExtroPDF - Smart AI powered Document conversion Assistant.",
  description:
    "Chat with your documents using advanced AI. Extract insights, summarize, and interact with your PDFs intelligently.",
  keywords:
    "AI PDF chat, document AI, smart PDF assistant, AI-powered document analysis",
  openGraph: {
    title: "ExtroPDF - Smart AI powered Document conversion Assistant.",
    description:
      "Engage with your PDFs like never before using AI-powered document conversations.",
    type: "website",
  },
  alternates: {
    canonical: `${PORT}/sign-up`,
  },
};

const sign_up = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
};

export default sign_up;
