"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar } from "lucide-react";
import { ExtendedUser } from "./Account";

const ProfileCard = ({ userData }: { userData: ExtendedUser }) => {
  const totalQuestions =
    userData.files?.reduce(
      (total, file) =>
        total + file?.chats?.filter((chat) => chat.role === "HUMAN")?.length,
      0
    ) || 0;

  return (
    <Card className="overflow-hidden border bg-card">
      <div className="relative px-6 py-3">
        {/* Profile Info */}
        <div className="mt-2 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight">
                {userData?.name || "Anonymous User"}
              </h3>
              <div className="mt-2 flex items-center gap-4">
                <Badge variant="secondary" className="font-normal">
                  {userData.plan} Member
                </Badge>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="mt-6 grid gap-4 border-t pt-6 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{userData?.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                Joined{" "}
                {new Date(userData.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-4 border-t pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {userData?.files?.length || 0}
              </div>
              <div className="text-xs text-muted-foreground">Documents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{totalQuestions}</div>
              <div className="text-xs text-muted-foreground">Questions</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
