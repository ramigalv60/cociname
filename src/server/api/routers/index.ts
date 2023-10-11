import { z } from "zod";

import { PrismaClient, Categoria } from "@prisma/client";

type CategoriaWhereUniqueInput = Pick<Categoria, "nombre">;

const prisma = new PrismaClient();

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const dificultad = z.enum(["Fácil", "Medio", "Difícil"]);

const unidad = z.enum(["g", "kg", "ml", "l", "unidades"]);

export const indexRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

//Todas las funciones para buscar elementos de la base de datos
  obtenerCategorias: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.categoria.findMany();
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

  obtenerRecetasPorCategoria: publicProcedure.input(z.string()).query(({ ctx, input }) => {
      return ctx.prisma.categoria.findMany({
        where: {
          nombre: input,
        },
      });
    }),

  //Todas las funciones para crear elementos en la base de datos
  crearCategoria: publicProcedure.input(z.string()).query(({ ctx, input }) => {
      return ctx.prisma.categoria.create({
        data: {
          nombre: input    
        },
      })
    }),

  crearVideo: publicProcedure.input(z.object({
    titulo: z.string(),
    url: z.string(),
    receta: z.number(),
  })).query(({ ctx, input }) => {
      return ctx.prisma.video.create({
        data: {
          titulo: input.titulo,
          urlVideo: input.url,
          receta: {
            connect: { id: parseInt(String(input.receta)) },
          },
          duracion: 0,
          fechaPublicacion: new Date(),
        },
      });
    }),
    
  crearReceta: publicProcedure.input(z.object({ 
    titulo: z.string(), 
    descripcion: z.string(),
    tiempoPreparacion: z.number(),
    dificultad: z.enum(["Facil", "Medio", "Dificil"]),
    fechaPublicacion: z.date(),
    ingredientes: z.string(), 
    cantIngredientes: z.string(),
    unidadIngredientes: z.enum(["gr", "ml", "kg", "l", "unidad"]),
    imagen: z.string(), 
    categoria: z.number(),
    videos: z.string(), 
  })).query(({ ctx, input }) => {
      return ctx.prisma.receta.create({
        data: {
          titulo: input.titulo,
          descripcion: input.descripcion,
          tiempoPreparacion: input.tiempoPreparacion,
          dificultad: input.dificultad,
          fechaPublicacion: input.fechaPublicacion,
          ingredientes: input.ingredientes,
          cantIngredientes: input.cantIngredientes,
          unidadIngredientes: input.unidadIngredientes,
          imagen: input.imagen,
          categorias: {
            connect: { id: input.categoria },
          },
          videos: {
            connect: { id: parseInt(String(input.videos)) },
          },
        },
      });
    }),

    //Todas las funciones para actualizar elementos en la base de datos

    actualizarCategoria: publicProcedure.input(z.object({ id: z.number(), nombre: z.string() })).query(({ ctx, input }) => {
      return ctx.prisma.categoria.update({
        where: {id: input.id},
        data: {
          nombre: input.nombre,
        },
      });
    }),

    actualizarVideo: publicProcedure.input(z.object({ id: z.number(), titulo: z.string(), url: z.string(), receta: z.number() })).query(({ ctx, input }) => {
      return ctx.prisma.video.update({
        where: {id: input.id},
        data: {
          titulo: input.titulo,
          urlVideo: input.url,
          receta: {
            connect: { id: parseInt(String(input.receta)) },
          },
        },
      });
    }),
      
    actualizarReceta: publicProcedure.input(z.object({ 
      id: z.number(), 
      titulo: z.string(), 
      descripcion: z.string(),
      tiempoPreparacion: z.number(),
      dificultad: z.enum(["Facil", "Medio", "Dificil"]),
      fechaPublicacion: z.date(),
      ingredientes: z.string(), 
      cantIngredientes: z.string(),
      unidadIngredientes: z.enum(["gr", "ml", "kg", "l", "unidad"]),
      imagen: z.string(), 
      categoria: z.number(),
      videos: z.string(), 
    })).query(({ ctx, input }) => {
      return ctx.prisma.receta.update({
        where: {id: input.id},
        data: {
          titulo: input.titulo,
          descripcion: input.descripcion,
          tiempoPreparacion: input.tiempoPreparacion,
          dificultad: input.dificultad,
          fechaPublicacion: input.fechaPublicacion,
          ingredientes: input.ingredientes,
          cantIngredientes: input.cantIngredientes,
          unidadIngredientes: input.unidadIngredientes,
          imagen: input.imagen,
          categorias: {
            connect: { id: input.categoria },
          },
          videos: {
            connect: { id: parseInt(String(input.videos)) },
          },
        },
      });
    }),

    //Todas las funciones para eliminar elementos en la base de datos
    eliminarReceta: publicProcedure.input(z.number()).query(({ ctx, input }) => {
      return ctx.prisma.receta.delete({
        where: {id: input},
      });
    }),

    eliminarVideo: publicProcedure.input(z.number()).query(({ ctx, input }) => {
      return ctx.prisma.video.delete({
        where: {id: input},
      });
    }),

    eliminarCategoria: publicProcedure.input(z.number()).query(({ ctx, input }) => {
      return ctx.prisma.categoria.delete({
        where: {id: input},
      });
    }),
  });