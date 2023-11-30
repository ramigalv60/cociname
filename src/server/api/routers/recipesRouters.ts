import { z } from "zod";
import { PrismaClient, Categoria } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Router } from "@trpc/server";
import { v2 as cloudinary } from "cloudinary";
import { TRPCError } from '@trpc/server';
import { recipeSchema, ingredientSchema, categorySchema, videoSchema, } from "~/server/schemas";

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

export const getRecetaBySearch = createTRPCRouter({
  getRecipeBySearch: publicProcedure.query(async ({ ctx, input }) => {
    const recipe = await ctx.prisma.receta.findUnique({
      where: { id: input },
      include: {
        videos: true,
        imagen: true,
        categoria: true,
      },
    });

    if (!recipe) {
      throw new Error("No recipe found");
    }
    return recipe;
  }),
});

export const getRecetaByCategory = createTRPCRouter({
  getRecetaByCategory: publicProcedure.query(async ({ ctx, input }) => {
    const recipe = await ctx.prisma.receta.findMany({
      where: { categoriaId: input },
      include: {
        videos: true,
        imagen: true,
        categoria: true,
      },
    });

    if (!recipe) {
      throw new Error("No recipe found");
    }
    return recipe;
   }),
  });

export const createReceta = createTRPCRouter({
  createReceta: publicProcedure.input(recipeSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const recipe = await ctx.prisma.receta.create({
          data: {
            titulo: input.titulo,
            descripcion: input.descripcion,
            contenido: input.contenido,
            tiempoPreparacion: input.tiempoPreparacion,
            dificultad: input.dificultad,
            fechaPublicacion: input.fechaPublicacion,
            ingredientes: {
              create: input.ingredientes,
            },
            categoria: {
              connect: {
                id: input.categoriaId,
              },
            },
            videos: {
              create: input.videos,
            },
            imagen: {
              create: input.imagen,
            },
          },
        });
        return recipe;
      } catch (error) {
        throw new Error("Failed to create recipe");
      }
    }),
});

export const updateReceta = createTRPCRouter({
  updateReceta: publicProcedure.input(recipeSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const recipe = await ctx.prisma.receta.update({
        where: { id: input.id },
        data: {
          titulo: input.titulo,
          descripcion: input.descripcion,
          contenido: input.contenido,
          tiempoPreparacion: input.tiempoPreparacion,
          dificultad: input.dificultad,
          fechaPublicacion: input.fechaPublicacion,
          ingredientes: {
            create: input.ingredientes,
          },
          categoria: {
            connect: {
              id: input.categoriaId,
            },
          },
          videos: {
            create: input.videos,
          },
          imagen: {
            create: input.imagen,
          },
        },
      });
      return recipe;
    } catch (error) {
      console.error("Failed to update recipe:", error);
      throw new Error("Failed to update recipe");
    }
  }),
});

export const deleteReceta = createTRPCRouter({
  deleteReceta: publicProcedure.input(recipeSchema)
  .mutation(async ({ ctx, input }) => {
  try {
    const recipe = await ctx.prisma.receta.delete({
      where: { id: input.id },
    });
  } catch (error) {
    console.error("Failed to delete recipe:", error);
    throw new Error("Failed to delete recipe");
  }
  }),
});

export const createCategoria = createTRPCRouter({
  createCategoria: publicProcedure.input(categorySchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const category = await ctx.prisma.categoria.create({
        data: {
          nombre: input.nombre,
        },
      });
      return category;
    } catch (error) {
      throw new Error("Failed to create category");
    }
  }),
});

export const updateCategoria = createTRPCRouter({
  updateCategoria: publicProcedure.input(categorySchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const category = await ctx.prisma.categoria.update({
        where: { id: input.id },
        data: {
          nombre: input.nombre,
        },
      });
      return category;
    } catch (error) {
      console.error("Failed to update category:", error);
      throw new Error("Failed to update category");
    }
  }),
});

export const deleteCategoria = createTRPCRouter({
  deleteCategoria: publicProcedure.input(categorySchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const category = await ctx.prisma.categoria.delete({
        where: { id: input.id },
      });
    } catch (error) {
      console.error("Failed to delete category:", error);
      throw new Error("Failed to delete category");
    }
  }),
});