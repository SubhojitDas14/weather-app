import { auth } from "@/lib/auth";

export default auth((req) => {
  // Protected routes logic here
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
