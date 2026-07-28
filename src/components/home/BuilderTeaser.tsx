import { ArrowRight, ChefHat, Flame } from "lucide-react";
import { useTranslation } from "react-i18next";

import LocalizedLink from "@/components/navigation/LocalizedLink";

import { Button } from "@/components/ui/button";


export default function BuilderTeaser() {
  const { t } = useTranslation();


  return (
    <section className="container mx-auto px-4 py-20">


      <div className="rounded-3xl bg-orange-100 p-8 md:p-12">


        <div className="grid gap-8 md:grid-cols-2 md:items-center">


          {/* Text */}
          <div className="space-y-6">


            <div className="flex items-center gap-2 text-orange-700">

              <ChefHat className="h-5 w-5" />

              <span className="text-sm font-medium">
                {t("builder.badge")}
              </span>

            </div>



            <h2 className="text-3xl font-bold md:text-5xl">

              {t("builder.title")}

            </h2>



            <p className="text-lg text-muted-foreground">

              {t("builder.subtitle")}

            </p>




            <LocalizedLink to="/builder">

              <Button size="lg">

                {t("builder.button")}

                <ArrowRight className="ml-2 h-5 w-5" />

              </Button>

            </LocalizedLink>


          </div>





          {/* Visual */}
          <div className="flex justify-center">


            <div className="flex h-48 w-48 items-center justify-center rounded-full bg-orange-200">

              <Flame className="h-20 w-20 text-orange-600" />

            </div>


          </div>



        </div>


      </div>


    </section>
  );
}