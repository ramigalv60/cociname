import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from 'react';
import { api } from "~/utils/api";
import { v2 as cloudinary } from "cloudinary";
import { recipeSchema } from "~/server/schemas";

// Form for creating recipes
function RecipeForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const createRecipeMutation = api.crearReceta.createReceta.useMutation(
    //recipeSchema
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

   // try {
     // await createRecipeMutation.mutate({  });
     // setTitle('');
     // setDescription('');
     // alert('Recipe created successfully');
    //} catch (error) {
      //alert(`Failed to create recipe: ${error}`);
    //}
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <button type="submit">Create Recipe</button>
    </form>
  );
}