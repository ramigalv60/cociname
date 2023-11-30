import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  // "/" will be accessible to all users
  publicRoutes: ["/", "/api/trpc/recipesRouter/getRecipeBySearch", "/api/trpc/recipesRouter/getRecetaByCategory", "/api/trpc/getRouters/getRecipes", "/api/trpc/getRouters/getVideos", "/api/trpc/getRouters/getIngredients", "/api/trpc/getRouters/getCategories", "/api/trpc/categoriasRouters/createCategoria", "/api/trpc/categoriasRouters/updateCategoria", "/api/trpc/categoriasRouters/deleteCategoria"],
});
 
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};