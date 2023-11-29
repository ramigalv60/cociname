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
  tiempoPreparacion: z.number(),
  dificultad: z.nativeEnum({
    Fácil: "Fácil",
    Medio: "Medio",
    Difícil: "Difícil",
  }),
  fechaPublicacion: z.date(),
  ingredientes: z.array(
    z.object({
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
    })
  ),
  categorias: z.object({
    id: z.number(),
    nombre: z.string(),
  }),
  videos: z.array(
    z.object({
      id: z.number(),
      titulo: z.string(),
      urlVideo: z.string(),
      duracion: z.number(),
      fechaPublicacion: z.date(),
      recetaId: z.number(),
    })
  ),
  comentarios: z.array(
    z.object({
      id: z.number(),
      texto: z.string(),
      fecha: z.date(),
      recetaId: z.number(),
    })
  ),
  imagen: z.string(),
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

const getRecetas = createTRPCRouter({
  getRecipes: publicProcedure.query(async ({ ctx }) => {
    const recipes = await ctx.prisma.receta.findMany({
      include: {
        videos: true,
        imagen: true,
      },
    });
  }),
});

const getVideos = createTRPCRouter({
  getVideos: publicProcedure.query(async ({ ctx }) => {
    const videos = await ctx.prisma.video.findMany();
  }),
});

const getIngredientes = createTRPCRouter({
  getIngredients: publicProcedure.query(async ({ ctx }) => {
    const ingredients = await ctx.prisma.ingrediente.findMany();
  }),
});

const getCategorias = createTRPCRouter({
  getCategories: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.prisma.categoria.findMany();
  }),
});

const getRecetaBySearch = createTRPCRouter({
  getRecipeBySearch: publicProcedure.query(async ({ ctx, input }) => {
    const recipe = await ctx.prisma.receta.findUnique({
      where: { id: input },
      include: {
        videos: true,
        imagen: true,
        categorias: true,
      },
    });
  }),
});

const createReceta = createTRPCRouter({
  mutations: {
    createRecipe: {
      input: recipeSchema,
      resolve: async ({ input, ctx }) => {
        const { titulo, descripcion } = input;

        const recipe = await ctx.prisma.receta.create({
          data: { titulo, descripcion },
        });

        if (!recipe) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to create recipe',
          });
        }

        return recipe;
      },
    },
  },
});
