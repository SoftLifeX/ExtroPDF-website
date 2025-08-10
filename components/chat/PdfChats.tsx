"use client";

import React, { useState, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bot, FileText, Send, User } from "lucide-react";
import { Input } from "../ui/input";
import { Message } from "@/app/(pages)/pdf/[id]/page";
import useGetChats from "@/features/chats/useGetChats";
import askQuestion from "@/actions/askQuestion";
import { toast } from "@/hooks/use-toast";
import ChatSkeleton from "./ChatSkeleton";
import { Chat } from "@prisma/client";

const FREE_LIMIT = 5;

const PdfChats = ({ pdfUrl }: { pdfUrl: string }) => {
  const { chats, chatsLoading, chatsError } = useGetChats(pdfUrl);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isPending, startTransition] = useTransition();

  // Load chats when available
  useEffect(() => {
    if (chats?.data) {
      setMessages(chats.data);
    }
  }, [chats]);

  // Ensure the first message is always from AI
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: "AI",
          message: "Hi, you can ask anything about the document.",
          createdAt: new Date(),
        },
      ]);
    }
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessageCount = messages.filter(
      (m: Message) => m.role === "HUMAN"
    ).length;

    if (userMessageCount >= FREE_LIMIT) {
      toast({
        variant: "destructive",
        title: "Limit Reached",
        description: "You have reached the limit. Upgrade to continue!",
      });
      return;
    }

    setMessages((prev) => [
      ...prev,
      { role: "HUMAN", message: inputValue, createdAt: new Date() },
      { role: "AI", message: "Thinking...", createdAt: new Date() },
    ]);

    startTransition(async () => {
      const response = await askQuestion({
        fileId: pdfUrl,
        input: inputValue,
      });

      if (
        response &&
        response.success !== undefined &&
        response.message !== undefined
      ) {
        setMessages((prev) => {
          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1] = {
            role: "AI",
            message: response.success
              ? response.message
              : `Whoops... ${response.message}`,
            createdAt: new Date(),
          };
          return updatedMessages;
        });
      } else {
        setMessages((prev) => {
          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1] = {
            role: "AI",
            message: "There was an error with your request. Please try again.",
            createdAt: new Date(),
          };
          return updatedMessages;
        });
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occurred while processing your request.",
        });
      }
    });

    setInputValue("");
  };

  if (chatsLoading) return <ChatSkeleton />;
  if (chatsError)
    return (
      <div className="flex justify-center items-center h-full">
        <h1 className="text-red-500 font-semibold text-lg">
          ⚠️ Facing technical issues. Try again later.
        </h1>
      </div>
    );

  return (
    <div className="flex flex-col overflow-y-scroll w-full">
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${
              msg.role === "HUMAN" ? "justify-end" : "justify-start"
            }`}
          >
            {/* Avatar for AI (Left) & Human (Right) */}
            {msg.role === "AI" && (
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black dark:bg-white">
                <Bot className="w-4 h-4 text-white dark:text-black" />
              </div>
            )}

            {/* Chat Bubble */}
            <div
              className={`rounded-lg p-4 max-w-[350px] text-sm ${
                msg.role === "HUMAN"
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-white text-black dark:bg-black dark:text-white border-2"
              }`}
            >
              <p>{msg?.message}</p>
            </div>

            {/* Avatar for Human (Right) */}
            {msg.role === "HUMAN" && (
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-200 dark:bg-black">
                <User className="w-4 h-4 text-black dark:text-white" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-2 border-t bg-white dark:bg-zinc-900">
        <form
          onSubmit={handleSendMessage}
          className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-2 flex items-center gap-3"
        >
          <Input
            type="text"
            placeholder="Ask a question..."
            className="flex-1 bg-transparent border-0 focus:outline-none text-sm px-2"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            disabled={!inputValue || isPending}
            type="submit"
            size="sm"
            className="bg-black text-white dark:bg-white dark:text-black"
          >
            <Send />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PdfChats;
