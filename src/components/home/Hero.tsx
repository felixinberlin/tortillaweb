import { ArrowRight, Flame, Egg, BookOpen } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import LocalizedLink from "@/components/navigation/LocalizedLink";

import { Button } from "@/components/ui/button";


export default function Hero() {
  const { t } = useTranslation();


  return (
    <section className="relative overflow-hidden bg-orange-50">

      <div className="container mx-auto grid min-h-[600px] items-center gap-12 px-4 py-20 md:grid-cols-2">


        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >

          <div className="flex items-center gap-2 text-sm font-medium text-orange-700">

            <Flame className="h-4 w-4" />

            {t("hero.badge")}

          </div>




          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">

            {t("hero.title")}

          </h1>




          <p className="max-w-xl text-lg text-muted-foreground">

            {t("hero.subtitle")}

          </p>




          <div className="flex flex-wrap gap-4">


            <LocalizedLink to="/recipes">

              <Button size="lg">

                {t("hero.recipesButton")}

                <ArrowRight className="ml-2 h-5 w-5" />

              </Button>

            </LocalizedLink>





            <LocalizedLink to="/builder">

              <Button
                size="lg"
                variant="outline"
              >

                {t("hero.buildButton")}

              </Button>

            </LocalizedLink>


          </div>





          <div className="flex gap-6 pt-4 text-sm">


            <div className="flex items-center gap-2">

              <Egg className="h-5 w-5 text-orange-600" />

              {t("hero.ingredients")}

            </div>




            <div className="flex items-center gap-2">

              <BookOpen className="h-5 w-5 text-orange-600" />

              {t("hero.knowledge")}

            </div>


          </div>


        </motion.div>





        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >

          <div className="aspect-square overflow-hidden rounded-3xl bg-orange-200 shadow-xl">

            <img
              src="/images/tortillaenbar.jpg"
              alt={t("hero.title")}
              className="h-full w-full object-cover"
            />

          </div>

        </motion.div>


      </div>

    </section>
  );
}