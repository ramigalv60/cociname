import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  // "/" will be accessible to all users
  // "/(api|trpc)(.*)" will be accessible to all usersq
  publicRoutes: ["/", "/(api|trpc)(.*)"],
});
 
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};