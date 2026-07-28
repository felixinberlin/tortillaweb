import { useTranslation } from "react-i18next";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import LocalizedLink from "@/components/navigation/LocalizedLink";


const recipes = [
  {
    id: "clasica",
    image: "/images/tortillaenbar.jpg",
  },
  {
    id: "con-cebolla",
    image: "/images/tortillaenbar.jpg",
  },
  {
    id: "betanzos",
    image: "/images/tortillaenbar.jpg",
  },
];


export default function Recipes() {
  const { t } = useTranslation();


  return (
    <main className="container mx-auto px-4 py-20">


      <section className="mb-12">

        <h1 className="text-5xl font-bold">
          {t("recipes.title")}
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          {t("recipes.subtitle")}
        </p>

      </section>



      <section className="grid gap-8 md:grid-cols-3">


        {recipes.map((recipe) => (

          <LocalizedLink
            key={recipe.id}
            to={`/recipes/${recipe.id}`}
          >

            <Card className="overflow-hidden transition hover:shadow-lg">

              <img
                src={recipe.image}
                alt={t(`recipeItems.${recipe.id}.title`)}
                className="h-56 w-full object-cover"
              />


              <CardHeader>

                <CardTitle>
                  {t(`recipeItems.${recipe.id}.title`)}
                </CardTitle>

              </CardHeader>


              <CardContent>

                <p className="text-muted-foreground">
                  {t(`recipeItems.${recipe.id}.description`)}
                </p>

              </CardContent>

            </Card>

          </LocalizedLink>

        ))}


      </section>


    </main>
  );
}