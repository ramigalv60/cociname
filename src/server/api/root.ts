import { get } from "http";
import { getRecetas, getCategorias, getIngredientes, getVideos, getRecetaBySearch, createReceta, getRecetaByCategory, updateReceta, deleteReceta } from "./routers/recipes";
import { createTRPCRouter } from "~/server/api/trpc";
import { de } from "date-fns/locale";

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
  getRecetaByCategory: getRecetaByCategory,
  createReceta: createReceta,
  updateReceta: updateReceta,
  deleteReceta: deleteReceta,
});

// export type definition of API
export type AppRouter = typeof appRouter;
