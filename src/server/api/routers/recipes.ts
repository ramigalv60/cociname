import { z } from "zod";
import { PrismaClient, Categoria } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Router } from "@trpc/server";
import { v2 as cloudinary } from "cloudinary";
import { TRPCError } from '@trpc/server';

const prisma = new PrismaClient();

// Define the recipe schema using zod
const recipeSchema = z.object({
  id: z.number(),
  titulo: z.string(),
  descripcion: z.string(),
  contenido: z.string(),
  tiempoPreparacion: z.number(),
  dificultad: z.enum([
    "Facil",
    "Medio",
    "Dificil",
  ]),
  fechaPublicacion: z.date(),
  ingredientes: z.array(
    z.object({
      id: z.number(),
      nombre: z.string(),
      cantidad: z.number(),
      unidad: z.enum([
        "gr", 
        "kg", 
        "ml", 
        "l", 
        "unidad"
      ]),
      recetaId: z.number(),
    })
  ),
  categoria: z.object({
    id: z.number(),
    nombre: z.string(),
  }),
  videos: z.object({
      id: z.number(),
      titulo: z.string(),
      urlVideo: z.string(),
      duracion: z.number(),
      fechaPublicacion: z.date(),
      recetaId: z.number(),
    }),
  imagen: z.array(
    z.object({
    id: z.number(),
    urlImagen: z.string(),
    recetaId: z.number(),
  })),
  categoriaId: z.number(),
});

// Define the ingredient schema using zod
const ingredientSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  cantidad: z.number(),
  unidad: z.nativeEnum({
    g: "g", 
    kg: "kg", 
    ml: "ml", 
    l: "l", 
    unidades: "unidades"
  }),
  recetaId: z.number(),
});

// Define the category schema using zod
const categorySchema = z.object({
  id: z.number(),
  nombre: z.string(),
});

// Define the video schema using zod
const videoSchema = z.object({
  id: z.number(),
  titulo: z.string(),
  urlVideo: z.string(),
  duracion: z.number(),
  fechaPublicacion: z.date(),
  recetaId: z.number(),
});

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
    return videos; 
  }),
});

export const getIngredientes = createTRPCRouter({
  getIngredients: publicProcedure.query(async ({ ctx }) => {
    const ingredients = await ctx.prisma.ingrediente.findMany();
    return ingredients;
  }),
});

export const getCategorias = createTRPCRouter({
  getCategories: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.prisma.categoria.findMany();
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
    return recipe;
   }),
  });

export const createReceta = createTRPCRouter({
  createReceta: publicProcedure.input(recipeSchema)
  .mutation(async ({ ctx, input }) => {
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
  }),
});

export const updateReceta = createTRPCRouter({
  updateReceta: publicProcedure.input(recipeSchema)
  .mutation(async ({ ctx, input }) => {
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
  }),
});

export const deleteReceta = createTRPCRouter({
  deleteReceta: publicProcedure.input(recipeSchema)
  .mutation(async ({ ctx, input }) => {
    const recipe = await ctx.prisma.receta.delete({
      where: { id: input.id },
    });
  }),
});