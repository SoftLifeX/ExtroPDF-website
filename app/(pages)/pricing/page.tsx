import PricingPage from "@/components/pricing/PricingPage";
import { Metadata } from "next";
import { PORT } from "../layout";

export const metadata: Metadata = {
  title: "Pricing - ExtroPDF - Smart AI powered Document conversion Assistant.",
  description:
    "Chat with your documents using advanced AI. Extract insights, summarize, and interact with your PDFs intelligently.",
  keywords:
    "AI PDF chat, document AI, smart PDF assistant, AI-powered document analysis",

  alternates: {
    canonical: `${PORT}/pricing`,
  },
};
const page = () => {
  return <PricingPage />;
};

export default page;
