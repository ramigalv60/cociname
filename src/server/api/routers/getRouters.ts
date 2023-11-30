import { PrismaClient} from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const prisma = new PrismaClient();

export const getRecetas = createTRPCRouter({
    getRecipes: publicProcedure.query(async ({ ctx }) => {
      const recipes = await ctx.prisma.receta.findMany({
        include: {
          videos: true,
          imagen: true,
        },
      });
  
      if (recipes.length === 0) {
        throw new Error("No recipes found");
      }
  
      return recipes;
    }),
  });
  
  export const getVideos = createTRPCRouter({
    getVideos: publicProcedure.query(async ({ ctx }) => {
      const videos = await ctx.prisma.video.findMany();
  
      if (videos.length === 0) {
        throw new Error("No videos found");
      }
      return videos; 
    }),
  });
  
  export const getIngredientes = createTRPCRouter({
    getIngredients: publicProcedure.query(async ({ ctx }) => {
      const ingredients = await ctx.prisma.ingrediente.findMany();
  
      if (ingredients.length === 0) {
        throw new Error("No ingredients found");
      }
      return ingredients;
    }),
  });
  
  export const getCategorias = createTRPCRouter({
    getCategories: publicProcedure.query(async ({ ctx }) => {
      const categories = await ctx.prisma.categoria.findMany();
  
      if (categories.length === 0) {
        throw new Error("No categories found");
      }
      return categories;
    }),
  });