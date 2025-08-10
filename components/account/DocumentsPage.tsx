"use client";

import FileCards from "@/components/account/FileCards";
import useGetUser from "@/features/user/useGetUser";
import React from "react";

import { FileCardsSkeleton } from "@/components/skeleton-ui";
import Error from "@/components/Error";
import { ExtendedUser, PLANS } from "./Account";

const DocumentsPage = () => {
  const { user, userPending, userError } = useGetUser();

  if (userPending) return <FileCardsSkeleton />;
  if (userError) return <Error />;

  const userData = user?.data as ExtendedUser;
  const userPlan = PLANS[userData?.plan as keyof typeof PLANS]
    ? (userData.plan as keyof typeof PLANS)
    : "BASIC";

  if (userPending) return <h1>loading</h1>;

  return (
    <div className="py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <FileCards
          files={userData?.files ?? []}
          maxQuestionsPerFile={PLANS[userPlan].QUESTIONSPERFILE}
          userPlan={userPlan}
        />
      </div>
    </div>
  );
};

export default DocumentsPage;
