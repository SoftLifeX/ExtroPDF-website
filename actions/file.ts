"use server";

import prisma from "@/prisma/db";

export const fileSaveToDB = async ({
  fileName,
  fileSize,
  type,
  userId,
}: {
  fileName: string;
  fileSize: number;
  type: string;
  userId: string;
}) => {
  const newFile = await prisma.file.create({
    data: {
      fileUrl: "",
      userId,
      fileName,
      fileSize,
      type,
    },
  });
  return newFile?.id;
};

export const updateFileToDB = async (fileId: string, secure_url: string) => {
  const newFile = await prisma.file.update({
    where: { id: fileId },
    data: { fileUrl: secure_url },
  });
  return newFile;
};
