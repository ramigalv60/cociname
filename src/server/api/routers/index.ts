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

//Todas las funciones para buscar elementos de la base de datos
  obtenerCategoria: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.categoria.findMany();
  }),

  obtenerRecetas: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.receta.findMany();
  }),

  obtenerReceta: publicProcedure.input(z.string()).query(({ ctx, input }) => {
      return ctx.prisma.receta.findFirst({
        where: {
          titulo: input,},
        });
      }),

  obtenerRecetasPorCategoria: publicProcedure.input(z.string()).query(({ ctx, input }) => {
      return ctx.prisma.categoria.findMany({
        where: {
          nombre: input,
        },
      });
    }),

  /*Todas las funciones para crear elementos en la base de datos
  crearCategoria: publicProcedure.input(z.string()).query(({ ctx, input }) => {
      return ctx.prisma.categoria.create({
        data: {
          nombre: input    
        },
      })
    }),
    
  crearReceta: publicProcedure.input(z.object({
    categoria: z.string(), 
    titulo: z.string(), 
    descripcion: z.string(), 
    ingredientes: z.string(), 
    preparacion: z.string(), 
    imagen: z.string()
  })).query(({ ctx, input }) => {
      return ctx.prisma.receta.create({
        data: {
          categoria: input.categoria,
          titulo: input.titulo,
          descripcion: input.descripcion,
          ingredientes: input.ingredientes,
          preparacion: input.preparacion,
          imagen: input.imagen,
        },
      });
    }),
    */

    /*Todas las funciones para actualizar elementos en la base de datos
    actualizarReceta: publicProcedure.input(z.object({ id: z.number(), titulo: z.string(), descripcion: z.string(), ingredientes: z.string(), preparacion: z.string(), imagen: z.string() })).query(({ ctx, input }) => {
      return ctx.prisma.receta.update({
        where: {id: input.id},
        data: {
          titulo: input.titulo,
          descripcion: input.descripcion,
          ingredientes: input.ingredientes,
          preparacion: input.preparacion,
          imagen: input.imagen,
        },
      });

    actualizarCategoria: publicProcedure.input(z.object({ id: z.number(), nombre: z.string() })).query(({ ctx, input }) => {
      return ctx.prisma.categoria.update({
        where: {id: input.id},
        data: {
          nombre: input.nombre,
        },
      });
      
    actualizarIngrediente: publicProcedure.input(z.object({ id: z.number(), nombre: z.string() })).query(({ ctx, input }) => {
      return ctx.prisma.ingrediente.update({
        where: {id: input.id},
        data: {
          nombre: input.nombre,
        },
      });
    */

    //Todas las funciones para eliminar elementos en la base de datos
    eliminarReceta: publicProcedure.input(z.number()).query(({ ctx, input }) => {
      return ctx.prisma.receta.delete({
        where: {id: input},
      });
    }),

    eliminarCategoria: publicProcedure.input(z.number()).query(({ ctx, input }) => {
      return ctx.prisma.categoria.delete({
        where: {id: input},
      });
    }),

    eliminarIngrediente: publicProcedure.input(z.number()).query(({ ctx, input }) => {
      return ctx.prisma.ingrediente.delete({
        where: {id: input},
      });
    }),
  });