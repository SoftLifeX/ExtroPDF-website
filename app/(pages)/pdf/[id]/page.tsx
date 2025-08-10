"use client";

import PdfChats from "@/components/chat/PdfChats";
import PdfHeader from "@/components/chat/PdfHeader";
import PdfPreview from "@/components/chat/PdfPreview";
import getPdfUrl from "@/utils/getPdfUrl";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Role = "HUMAN" | "AI" | "PLACEHOLDER";
export interface Message {
  id?: string;
  fileId?: string;
  userId?: string;
  role: Role;
  message: string;
  createdAt: Date;
}

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") return "loading";
  if (!session?.user) return router.push("/sign-in");

  const pdfUrl = getPdfUrl(session?.user.id, id);

  return (
    <div className="w-full h-full overflow-hidden my-6 py-3 rounded-lg">
      <div className="relative w-full max-w-5xl mx-auto">
        <div className="bg-white dark:bg-zinc-900 rounded-xl border overflow-hidden">
          <PdfHeader />
          <div className="grid grid-cols-1 md:grid-cols-2 h-full md:h-[500px] gap-6 overflow-hidden">
            <PdfPreview pdfUrl={pdfUrl} />
            <PdfChats pdfUrl={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
