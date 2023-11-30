import { getRecetaBySearch, createReceta, getRecetaByCategory, updateReceta, deleteReceta } from "./routers/recipesRouters";
import { getRecetas, getCategorias, getIngredientes, getVideos } from "./routers/getRouters";
import { createCategoria, updateCategoria, deleteCategoria } from "./routers/categoriasRouters";
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
  RecetaPorBusqueda: getRecetaBySearch,
  RecetaPorCategoria: getRecetaByCategory,
  crearReceta: createReceta,
  actualizarReceta: updateReceta,
  borrarReceta: deleteReceta,
  crearCategoria: createCategoria,
  actualizarCategoria: updateCategoria,
  borrarCategoria: deleteCategoria,
});

// export type definition of API
export type AppRouter = typeof appRouter;
