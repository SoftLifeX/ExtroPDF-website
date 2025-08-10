"use server";

import { authOptions } from "@/lib/auth";
import { generateLangChainCompletion } from "@/lib/langchain";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";

const askQuestion = async ({
  fileId,
  input,
}: {
  fileId: string;
  input: string;
}) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Authentication required. Please sign in.");

    await prisma.chat.create({
      data: {
        role: "HUMAN",
        message: input,
        fileId,
        userId: session.user.id,
        createdAt: new Date(),
      },
    });

    const reply = await generateLangChainCompletion(fileId, input);

    await prisma.chat.create({
      data: {
        role: "AI",
        message: reply,
        fileId,
        userId: session.user.id,
        createdAt: new Date(),
      },
    });

    return { success: true, message: reply };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "server error, try again later!",
    };
  }
};

export default askQuestion;
