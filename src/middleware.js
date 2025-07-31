import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return HOST_ALLOWED.includes(token?.email);
      },
    },
  }
);

export const config = { matcher: ["/admin"] };

const HOST_ALLOWED = [
  "macsingh11011@gmail.com",
  "macsingh110@gmail.com",
  "bishnoi11011@gmail.com",
  "www.rishabh16batra@gmail.com",
];
