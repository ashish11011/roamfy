import { withAuth } from "next-auth/middleware";
import { ADMIN_EMAILS } from "@/const/admin";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return ADMIN_EMAILS.includes(token?.email);
      },
    },
  }
);

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
