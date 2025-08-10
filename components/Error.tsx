import { AlertTriangle } from "lucide-react";
import React from "react";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
      <h2 className="text-lg font-semibold">An error occurred</h2>
      <p className="text-sm text-muted-foreground">
        Something went wrong. Please try again later.
      </p>
    </div>
  );
};

export default Error;
