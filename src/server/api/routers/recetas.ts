import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const recipesRouter = createTRPCRouter({
  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.receta.findFirst({
      where: {
        titulo: input,},
      });
    }),
  });
