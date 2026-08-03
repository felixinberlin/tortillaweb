import betanzos from "../../content/recipes/betanzos.json";
import clasica from "../../content/recipes/clasica.json";
import concebolla from "../../content/recipes/concebolla.json";
import express from "../../content/recipes/express.json";
import paisana from "../../content/recipes/paisana.json";
import quesoazul from "../../content/recipes/quesoazul.json";
import atun from "../../content/recipes/atun.json";
import type { RawRecipeInput } from "../tortilla-dna/types";

export const REFERENCE_RECIPES: RawRecipeInput[] = [
  betanzos as RawRecipeInput,
  clasica as RawRecipeInput,
  concebolla as RawRecipeInput,
  paisana as RawRecipeInput,
  express as RawRecipeInput,
  quesoazul as RawRecipeInput,
  atun as RawRecipeInput,
];

export function getReferenceRecipes(): RawRecipeInput[] {
  return REFERENCE_RECIPES;
}
