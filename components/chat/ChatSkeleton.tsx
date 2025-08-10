import React from "react";
import { Skeleton } from "../ui/skeleton";

const ChatSkeleton = () => {
  return (
    <div className="space-y-11 py-6 px-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className={`flex gap-3 ${
            index % 2 === 0 ? "justify-start" : "justify-end"
          }`}
        >
          {/* Avatar Skeleton */}
          {index % 2 === 0 && (
            <Skeleton className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700" />
          )}

          {/* Chat Bubble Skeleton */}
          <Skeleton className="h-20 w-[300px] rounded-lg bg-gray-300 dark:bg-gray-700" />

          {/* Avatar Skeleton (for human) */}
          {index % 2 !== 0 && (
            <Skeleton className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatSkeleton;
