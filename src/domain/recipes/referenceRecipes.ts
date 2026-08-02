import betanzos from "../../content/recipes/betanzos.json";
import clasica from "../../content/recipes/clasica.json";
import concebolla from "../../content/recipes/concebolla.json";
import express from "../../content/recipes/express.json";
import paisana from "../../content/recipes/paisana.json";
import jamon from "../../content/recipes/jamon.json";
import vegana from "../../content/recipes/vegana.json";
import type { RawRecipeInput } from "../tortilla-dna/types";

export const REFERENCE_RECIPES: RawRecipeInput[] = [
  betanzos as RawRecipeInput,
  clasica as RawRecipeInput,
  concebolla as RawRecipeInput,
  paisana as RawRecipeInput,
  express as RawRecipeInput,
  jamon as RawRecipeInput,
  vegana as RawRecipeInput,
];

export function getReferenceRecipes(): RawRecipeInput[] {
  return REFERENCE_RECIPES;
}
