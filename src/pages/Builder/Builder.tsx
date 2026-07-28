import { useTranslation } from "react-i18next";


export default function Builder() {
  const { t } = useTranslation();


  return (
    <main className="container mx-auto px-4 py-20">

      <h1 className="text-4xl font-bold">
        {t("builderPage.title")}
      </h1>


      <p className="mt-4 text-muted-foreground">
        {t("builderPage.description")}
      </p>

    </main>
  );
}