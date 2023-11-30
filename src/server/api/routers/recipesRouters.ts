import { PrismaClient} from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { recipeSchema} from "~/server/schemas";

const prisma = new PrismaClient();

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