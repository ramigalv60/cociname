import { z } from "zod";
import { PrismaClient, Categoria } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Router } from "@trpc/server";
import { query } from "@trpc/server";
import { merge } from "@trpc/server";

const prisma = new PrismaClient();

type CategoriaWhereUniqueInput = Pick<Categoria, "nombre">;

const dificultad = z.enum(["Fácil", "Medio", "Difícil"]);

const unidad = z.enum(["g", "kg", "ml", "l", "unidades"]);

// Define the schemas using zod
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

export const indexRouter = createTRPCRouter({})

  .merge(
    query('hello', {
      input: z.object({ text: z.string() }),
      resolve: ({ input }) => {
        return {
          greeting: `Hello ${input.text}`,
        };
      },
    }),
    query('obtenerCategorias', {
      resolve: async ({ ctx }) => {
        return await ctx.prisma.categoria.findMany();
      },
    }),
    query('obtenerRecetas', {
      resolve: async ({ ctx }) => {
        return await ctx.prisma.receta.findMany();
      },
    })
  );
  .query('obtenerRecetas', {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.receta.findMany();
    },
  })
  .query('buscarReceta', {
    input: z.string(),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.receta.findFirst({
        where: {
          titulo: input,
        },
      });
    },
  })
  .query('obtenerRecetasPorCategoria', {
    input: z.string(),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.receta.findMany({
        where: {
          categorias: {
            some: {
              nombre: input,
            },
          },
        },
      });
    },
  });