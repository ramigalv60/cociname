import { get } from "http";
import { getRecetas, getCategorias, getIngredientes, getVideos, getRecetaBySearch, createReceta } from "./routers/recipes";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  recetas: getRecetas,
  categorias: getCategorias,
  ingredientes: getIngredientes,
  videos: getVideos,
  recetaBySearch: getRecetaBySearch,
  createReceta: createReceta
});

// export type definition of API
export type AppRouter = typeof appRouter;
