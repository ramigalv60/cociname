# getRouters Documentation

The `getRouters` module is located in [`src\server\api\routers\getRouters.ts`]. It exports several functions that are used to fetch data from the database using Prisma.

## getRecetas

The `getRecetas` function is a tRPC router that fetches all recipes from the database. It includes related videos and images for each recipe.

```ts
export const getRecetas = createTRPCRouter({
  getRecipes: publicProcedure.query(async ({ ctx }) => {
    const recipes = await ctx.prisma.receta.findMany({
      include: {
        videos: true,
        imagen: true,
      },
    });
    if (recipes.length === 0) {
      throw new Error("No recipes found");
    }
    return recipes;
  }),
});
```

## getVideos

The `getVideos` function is a tRPC router that fetches all videos from the database.

```ts
export const getVideos = createTRPCRouter({
  getVideos: publicProcedure.query(async ({ ctx }) => {
    const videos = await ctx.prisma.video.findMany();
    if (videos.length === 0) {
      throw new Error("No videos found");
    }
    return videos;
  }),
});
```

## getIngredientes

The `getIngredientes` function is a tRPC router that fetches all ingredients from the database.

```ts
export const getIngredientes = createTRPCRouter({
  getIngredients: publicProcedure.query(async ({ ctx }) => {
    const ingredients = await ctx.prisma.ingrediente.findMany();
    if (ingredients.length === 0) {
      throw new Error("No ingredients found");
    }
    return ingredients;
  }),
});
```

## getCategorias

The `getCategorias` function is a tRPC router that fetches all categories from the database.

```ts
export const getCategorias = createTRPCRouter({
  getCategories: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.prisma.categoria.findMany();
    if (categories.length === 0) {
      throw new Error("No categories found");
    }
    return categories;
  }),
});
```

Each of these functions uses the `publicProcedure` function from the tRPC library to define a public procedure that can be called from the client side. The `query` method is used to define a query procedure, which is used to fetch data from the server. The `async` function passed to the `query` method is the actual procedure that will be executed when the query is called. It uses the Prisma client to fetch data from the database. If no data is found, it throws an error.

# recipesRouters Documentation

The `recipesRouters` module is located in [`src/server/api/routers/recipesRouters.ts`]. It exports several functions that are used to fetch specific recipe data from the database using Prisma.

## getRecetaBySearch

The `getRecetaBySearch` function is a tRPC router that fetches a specific recipe from the database by its ID. It includes related videos, images, and categories for the recipe.

```ts
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
```

## getRecetaByCategory

The `getRecetaByCategory` function is a tRPC router that fetches all recipes from the database that belong to a specific category.

```ts
export const getRecetaByCategory = createTRPCRouter({
  getRecetaByCategory: publicProcedure.input(
    z.object({
      id: z.number(),
    })
  )
    .query(async ({ ctx, input }) => {
    const recipe = await ctx.prisma.receta.findMany({
      where: { categoriaId: input.id },
      include: {
        videos: true,
        imagen: true,
      },
    });

    if (!recipe) {
      throw new Error("No recipe found");
    }
    return recipe;
  }),
});
```

Each of these functions uses the `publicProcedure` function from the tRPC library to define a public procedure that can be called from the client side. The `query` method is used to define a query procedure, which is used to fetch data from the server. The `async` function passed to the `query` method is the actual procedure that will be executed when the query is called. It uses the Prisma client to fetch data from the database. If no data is found, it throws an error.


# CRUD Documentation

These functions are part of the API and are used to perform CRUD (Create, Read, Update, Delete) operations on `Receta` and `Categoria` models. They are defined in the `routers` directory.

## createReceta

The `createReceta` function is used to create a new recipe in the database. It takes a `RecetaInput` object as input and returns the created `Receta`.

```ts
export const createReceta = createTRPCRouter({
  createReceta: publicProcedure.input(RecetaInput).mutation(async ({ ctx, input }) => {
    const newReceta = await ctx.prisma.receta.create({
      data: input,
    });
    return newReceta;
  }),
});
```

## updateReceta

The `updateReceta` function is used to update an existing recipe in the database. It takes a `RecetaUpdateInput` object as input and returns the updated `Receta`.

```ts
export const updateReceta = createTRPCRouter({
  updateReceta: publicProcedure.input(RecetaUpdateInput).mutation(async ({ ctx, input }) => {
    const updatedReceta = await ctx.prisma.receta.update({
      where: { id: input.id },
      data: input,
    });
    return updatedReceta;
  }),
});
```

## deleteReceta

The `deleteReceta` function is used to delete a recipe from the database. It takes the `id` of the recipe as input.

```ts
export const deleteReceta = createTRPCRouter({
  deleteReceta: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    const deletedReceta = await ctx.prisma.receta.delete({
      where: { id: input },
    });
    return deletedReceta;
  }),
});
```

## createCategoria

The `createCategoria` function is used to create a new category in the database. It takes a `CategoriaInput` object as input and returns the created `Categoria`.

```ts
export const createCategoria = createTRPCRouter({
  createCategoria: publicProcedure.input(CategoriaInput).mutation(async ({ ctx, input }) => {
    const newCategoria = await ctx.prisma.categoria.create({
      data: input,
    });
    return newCategoria;
  }),
});
```

## updateCategoria

The `updateCategoria` function is used to update an existing category in the database. It takes a `CategoriaUpdateInput` object as input and returns the updated `Categoria`.

```ts
export const updateCategoria = createTRPCRouter({
  updateCategoria: publicProcedure.input(CategoriaUpdateInput).mutation(async ({ ctx, input }) => {
    const updatedCategoria = await ctx.prisma.categoria.update({
      where: { id: input.id },
      data: input,
    });
    return updatedCategoria;
  }),
});
```

## deleteCategoria

The `deleteCategoria` function is used to delete a category from the database. It takes the `id` of the category as input.

```ts
export const deleteCategoria = createTRPCRouter({
  deleteCategoria: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    const deletedCategoria = await ctx.prisma.categoria.delete({
      where: { id: input },
    });
    return deletedCategoria;
  }),
});
```

Each of these functions uses the `publicProcedure` function from the tRPC library to define a public procedure that can be called from the client side. The `mutation` method is used to define a mutation procedure, which is used to modify data on the server. The `async` function passed to the `mutation` method is the actual procedure that will be executed when the mutation is called. It uses the Prisma client to interact with the database.

# schema.prisma Documentation

The `schema.prisma` file is located in [`prisma/schema.prisma`]. It defines the data model for the application and is used by Prisma to generate the Prisma Client – a type-safe database client that lets you interact with your database in a type-safe manner.

Here's a brief overview of the models defined in `schema.prisma` file:

## Receta

The `Receta` model represents a recipe. It has fields for `id`, `name`, `description`, `ingredients`, `steps`, `videoUrl`, `imageUrl`, and `categoryId`.

```prisma
model Receta {
  id                 Int      @id @default(autoincrement())
  titulo             String
  descripcion        String   @db.VarChar(5000)
  contenido          String   @db.Text
  tiempoPreparacion  Int
  dificultad         Dificultad
  fechaPublicacion   DateTime
  ingredientes       Ingrediente[]
  categoria         Categoria @relation(fields: [categoriaId], references: [id])
  videos             Video[]
  imagen             Imagen[]
  categoriaId        Int

  @@index([categoriaId])

}
```

## Category

The `Category` model represents a category of recipes. It has fields for `id` and `name`.

```prisma
model Categoria{
  id Int @id @default(autoincrement())
  nombre String
  recetas Receta  []  

}
```

Each `Receta` is related to a `Category` through the `categoryId` field in the `Receta` model and the `Recetas` field in the `Category` model.

## Video

The `Video` model represents a video. It has fields for `id`, `url`, and `recipeId`.

```prisma
model Video {
  id              Int      @id @default(autoincrement())
  titulo          String
  urlVideo        String
  duracion        Int
  fechaPublicacion DateTime
  receta          Receta   @relation(fields: [recetaId], references: [id])
  recetaId        Int

  @@index([recetaId])
}
```

Each `Video` is related to a `Receta` through the `recipeId` field in the `Video` model.

## Image

The `Image` model represents an image. It has fields for `id`, `url`, and `recipeId`.

```prisma
model Imagen{
  id Int @id @default(autoincrement())
  urlImagen String
  receta Receta @relation(fields: [recetaId], references: [id])
  recetaId Int

  @@index([recetaId])
}
```

Each `Image` is related to a `Receta` through the `recipeId` field in the `Image` model.
