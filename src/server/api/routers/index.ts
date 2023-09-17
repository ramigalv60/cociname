import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const indexRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  obtenerRecetas: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.receta.findMany();
  }),

  buscarReceta: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.receta.findFirst({
      where: {
        titulo: input,},
      });
    }),


});