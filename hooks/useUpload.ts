"use client";

import { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { fileToBase64 } from "@/utils/fileToBase64";
import cloudinaryUpload from "@/utils/cloudinaryUpload";
import { fileSaveToDB, updateFileToDB } from "@/actions/file";
import generateEmbedding from "@/actions/generateEmbedding";

export enum StatusText {
  CHECKING = "Checking file...",
  UPLOADING = "Uploading to cloud...",
  SAVING_TO_DB = "Saving file to database...",
  GENERATING = "Generating AI embedding...",
}

const useUpload = () => {
  const { data: session } = useSession();
  const [uploading, setUploading] = useState(false);
  const [fileId, setFileId] = useState("");
  const [status, setStatus] = useState<StatusText | null>(null);

  const uploadFile = useCallback(
    async (file: File) => {
      if (!session?.user?.id) {
        return toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please sign in to upload files.",
        });
      }

      if (file.type !== "application/pdf") {
        return toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Only PDF files are allowed.",
        });
      }

      if (file.size > 10 * 1024 * 1024) {
        return toast({
          variant: "destructive",
          title: "File too large",
          description: "File size must be less than 10MB.",
        });
      }

      setUploading(true);

      try {
        setStatus(StatusText.SAVING_TO_DB);
        const fileId = await fileSaveToDB({
          fileName: file.name,
          fileSize: file.size,
          type: file.type,
          userId: session.user.id,
        });

        setStatus(StatusText.UPLOADING);
        const base64File = await fileToBase64(file);
        const secureUrl = await cloudinaryUpload(
          base64File,
          fileId,
          session.user.id
        );

        await updateFileToDB(fileId, secureUrl);

        setStatus(StatusText.GENERATING);
        await generateEmbedding(fileId);

        setFileId(fileId);
        toast({
          variant: "default",
          title: "Upload successful",
          description: "Your file has been uploaded and processed.",
        });
        return secureUrl;
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Upload failed",
          description: "Something went wrong. Please try again.",
        });
      } finally {
        setUploading(false);
        setStatus(null);
      }
    },
    [session?.user?.id]
  );

  return { uploadFile, isPending: uploading, status, fileId };
};

export default useUpload;
