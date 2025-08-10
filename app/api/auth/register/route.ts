import { signUpSchema } from "@/lib/zod";
import prisma from "@/prisma/db";
import { ApiResponse } from "@/utils/ApiResponse";
import withErrorHandler from "@/utils/withErrorHandler";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await req.json();

  const { data, success, error } = signUpSchema.safeParse(body);
  if (!success) return ApiResponse(error.issues[0]?.message, null, 400);

  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
    select: { id: true },
  });

  if (existingUser)
    return ApiResponse(
      "User with this mail already exist, please login",
      null,
      409
    );

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });

  return ApiResponse("success", newUser, 200);
});
