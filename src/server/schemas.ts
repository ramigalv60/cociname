import { z } from "zod";

// Define the recipe schema using zod
export const recipeSchema = z.object({
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
export const ingredientSchema = z.object({
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
export const categorySchema = z.object({
    id: z.number(),
    nombre: z.string(),
  });
  
  // Define the video schema using zod
export const videoSchema = z.object({
    id: z.number(),
    titulo: z.string(),
    urlVideo: z.string(),
    duracion: z.number(),
    fechaPublicacion: z.date(),
    recetaId: z.number(),
  });