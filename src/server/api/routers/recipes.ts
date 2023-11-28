import { z } from "zod";
import { PrismaClient, Categoria } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Router } from "@trpc/server";

const prisma = new PrismaClient();

type CategoriaWhereUniqueInput = Pick<Categoria, "nombre">;

const dificultad = z.enum(["Fácil", "Medio", "Difícil"]);

const unidad = z.enum(["g", "kg", "ml", "l", "unidades"]);

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

export const recipesRouter = createTRPCRouter({
  getRecipes: publicProcedure.query(({ ctx }) => {
    return prisma.receta.findMany({
      include: {
        videos: true,
        imagen: true,
      },
    });
  }),
  
});