import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const protectedRoutes = ["/documents", "/account", "/settings"];
const authRoutes = ["/sign-in", "/sign-up"];

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // If the user has a token
    if (token) {
      if (authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next();
    }

    // If the user does NOT have a token
    if (!token) {
      if (protectedRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }
      return NextResponse.next();
    }
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/|api/).*)", // Exclude API routes
  ],
};
