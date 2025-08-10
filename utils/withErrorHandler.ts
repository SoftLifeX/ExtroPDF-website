import { NextResponse } from "next/server";
import { ApiResponse } from "./ApiResponse";

const withErrorHandler = (fn: (...args: any[]) => Promise<NextResponse>) => {
  return async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      return ApiResponse("Internal Server Error", null, 500);
    }
  };
};

export default withErrorHandler;
