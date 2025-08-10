import { authOptions } from "@/lib/auth";
import prisma from "@/prisma/db";
import { ApiResponse } from "@/utils/ApiResponse";
import withErrorHandler from "@/utils/withErrorHandler";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Authentication required. Please sign in.");

  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get("fileId");

  if (!fileId) throw new Error("Missing fileId in request parameters.");

  const chats = await prisma.chat.findMany({
    where: {
      userId: session.user.id,
      fileId,
    },
  });

  return ApiResponse("success", chats || {}, 200);
});
