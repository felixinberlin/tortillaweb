import {
  Egg,
  CookingPot,
  Flame,
  FlaskConical,
  BookOpen,
  Gamepad2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Ingredients",
    description:
      "Discover potatoes, eggs, onions, oil and the ingredients that define a tortilla.",
    icon: Egg,
  },
  {
    title: "Recipes",
    description:
      "Classic recipes, regional variations and your own custom creations.",
    icon: CookingPot,
  },
  {
    title: "Techniques",
    description:
      "Master frying, mixing, resting and the famous tortilla flip.",
    icon: Flame,
  },
  {
    title: "Science",
    description:
      "Understand heat, texture, chemistry and why recipes work.",
    icon: FlaskConical,
  },
  {
    title: "History",
    description:
      "Explore the origins and cultural importance of Spain's iconic dish.",
    icon: BookOpen,
  },
  {
    title: "Interactive Builder",
    description:
      "Create, simulate and save your perfect tortilla step by step.",
    icon: Gamepad2,
  },
];

export default function FeatureGrid() {
  return (
    <section className="container mx-auto px-4 py-20">

      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          Everything about tortilla de patatas
        </h2>

        <p className="mt-4 text-muted-foreground">
          More than recipes. A complete knowledge base
          dedicated to Spain's most famous dish.
        </p>
      </div>


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <Card
              key={feature.title}
              className="transition hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="space-y-4 p-6">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
                  <Icon />
                </div>

                <h3 className="text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground">
                  {feature.description}
                </p>

              </CardContent>
            </Card>
          );
        })}

      </div>

    </section>
  );
}
