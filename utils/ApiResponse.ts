import { NextResponse } from "next/server";

export const ApiResponse = (
  message: string,
  data: any = null,
  status: number
) => {
  return NextResponse.json({ message, data }, { status });
};
