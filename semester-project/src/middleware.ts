import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuthenticated = !!token;

    const authRoutes = ["/signin", "/signup"];
    const restrictedRoutes = ["/bookshelf", "/profile"];

    if (authRoutes.includes(req.nextUrl.pathname) && isAuthenticated) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (restrictedRoutes.includes(req.nextUrl.pathname) && !isAuthenticated) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ["/signin", "/signup", "/bookshelf", "/profile"],
};
