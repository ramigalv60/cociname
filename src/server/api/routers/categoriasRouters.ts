import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { categorySchema} from "~/server/schemas";


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