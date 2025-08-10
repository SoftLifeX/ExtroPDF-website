import { authOptions } from "@/lib/auth";
import prisma from "@/prisma/db";
import { ApiResponse } from "@/utils/ApiResponse";
import withErrorHandler from "@/utils/withErrorHandler";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const GET = withErrorHandler(async (_: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Authentication required. Please sign in.");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      files: {
        include: {
          chats: true,
        },
      },
      transactions: true,
    },
  });

  return ApiResponse("success", user, 200);
});
