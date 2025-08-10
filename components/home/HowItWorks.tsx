import { ArrowRight, Bot, FileText } from "lucide-react";
import React from "react";

const HowItWorks = () => {
  const HowItWorksList = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Upload PDF",
      description:
        "Simply drag and drop your PDF file or select it from your computer",
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "AI Processing",
      description: "Our AI analyzes and understands your document content",
    },
    {
      icon: <ArrowRight className="h-8 w-8" />,
      title: "Start Chatting",
      description:
        "Ask questions and get instant, accurate answers about your document",
    },
  ];
  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get started with our AI-powered document chat in three simple steps
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {HowItWorksList.map((feature, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-px bg-gradient-to-r from-zinc-500/20 to-zinc-500/20 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative p-8 bg-white dark:bg-black rounded-lg border">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}S
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
