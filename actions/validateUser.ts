"use server";

import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";

export const validateUser = async (credentials?: {
  email: string;
  password: string;
}) => {
  if (!credentials?.email || !credentials?.password)
    throw new Error("Email and password are required.");

  const user = await prisma.user.findUnique({
    where: { email: credentials.email },
  });

  if (!user || !user.password) throw new Error("Invalid email or password.");

  const isValid = await bcrypt.compare(credentials.password, user.password);

  if (!isValid) throw new Error("Invalid email or password.");

  return {
    _id: user.id.toString(),
    email: user.email,
    plan: user.plan,
    name: user.name,
  };
};
