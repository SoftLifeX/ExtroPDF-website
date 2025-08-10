import { authOptions } from "@/lib/auth";
import prisma from "@/prisma/db";
import { ApiResponse } from "@/utils/ApiResponse";
import withErrorHandler from "@/utils/withErrorHandler";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const PUT = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Authentication required. Please sign in.");

  const { amount, currency_code, plan, transactionId } = await req.json();

  const nextBilling = new Date();
  nextBilling.setDate(nextBilling.getDate() + 30);

  const transactionEntry = await prisma.transaction.create({
    data: {
      amount,
      currency_code,
      plan,
      transactionId,
      status: "COMPLETE",
      userId: session.user.id,
    },
  });

  const updgradeUser = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      plan,
      nextBilling,
    },
  });

  return ApiResponse("success", { updgradeUser, transactionEntry }, 200);
});
