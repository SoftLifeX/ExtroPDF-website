"use server";

import { authOptions } from "@/lib/auth";
import { generateEmbeddingInPineconeVectorStore } from "@/lib/langchain";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

const generateEmbedding = async (fileId: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Authentication required. Please sign in.");

    await generateEmbeddingInPineconeVectorStore(fileId);

    revalidatePath("/account");
    return { success: true, message: "Embedding generation completed." };
  } catch (error) {
    return { success: false, message: "Embedding failed." };
  }
};

export default generateEmbedding;
