"use client";

import { useEffect } from "react";
import { CloudUpload, Database, Loader2, Settings } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DropZone } from "@/components/DropZone";
import useUpload, { StatusText } from "@/hooks/useUpload";
import { useRouter } from "next/navigation";
import useGetUser from "@/features/user/useGetUser";
import { PLANS } from "@/components/account/Account";
import { toast } from "@/hooks/use-toast";

const statusIcons: Record<StatusText, JSX.Element> = {
  [StatusText.CHECKING]: (
    <Settings className="h-6 w-6 animate-spin text-primary" />
  ),
  [StatusText.UPLOADING]: (
    <CloudUpload className="h-6 w-6 animate-bounce text-primary" />
  ),
  [StatusText.SAVING_TO_DB]: <Database className="h-6 w-6 text-primary" />,
  [StatusText.GENERATING]: (
    <Loader2 className="h-6 w-6 animate-spin text-primary" />
  ),
};

function UploadingStatus({ status }: { status: StatusText | null }) {
  if (!status) return null;

  return (
    <div className="flex items-center gap-3 mt-6 p-4 bg-muted rounded-lg justify-center">
      {statusIcons[status]}
      <p className="font-medium">{status}</p>
    </div>
  );
}

const DropPage = () => {
  const router = useRouter();
  const { user, userPending } = useGetUser();

  const userData = user?.data;

  const userPlan = (
    userData?.plan && Object.keys(PLANS).includes(userData.plan)
      ? (userData.plan as keyof typeof PLANS)
      : "BASIC"
  ) as keyof typeof PLANS;

  const { FILES: maxFiles } = PLANS[userPlan];
  const hasReachedFileLimit = (userData?.files?.length ?? 0) >= maxFiles;

  const { uploadFile, isPending, status, fileId } = useUpload();

  useEffect(() => {
    if (fileId) return router.push(`pdf/${fileId}`);
  }, [router, fileId]);

  return (
    <div className="py-12 h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="space-y-4">
            {isPending ? (
              <UploadingStatus status={status} />
            ) : (
              <>
                <CardHeader>
                  <CardTitle>Upload PDF</CardTitle>
                  <CardDescription>
                    Drop your PDF file here or click to select
                  </CardDescription>
                </CardHeader>
                <DropZone
                  onFileSelect={(file: File) => {
                    if (hasReachedFileLimit)
                      return toast({
                        variant: "destructive",
                        title: "Limit Reached",
                        description:
                          "You have reached the limit. Upgrade to continue!",
                      });
                    uploadFile(file);
                  }}
                />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DropPage;
