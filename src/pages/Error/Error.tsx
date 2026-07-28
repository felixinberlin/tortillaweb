import { Link, useParams, useRouteError, useLocation } from "react-router-dom";
import { useEffect } from "react";
import i18n from "@/i18n/config";
import { useTranslation } from "react-i18next";


export default function Error() {
  const error = useRouteError();
  const params = useParams();
  const location = useLocation();

  let lang = params.lang;
  if (!lang) {
    const pathParts = location.pathname.split('/').filter(Boolean);
    if (pathParts.length > 0 && ["es", "en", "de"].includes(pathParts[0])) {
      lang = pathParts[0];
    }
  }
  lang = lang || "es";

  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);
  const { t } = useTranslation();


  return (
    <main className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">

      <div className="max-w-xl">

        <div className="text-7xl">
          🥔
        </div>

        <h1 className="mt-6 text-6xl font-bold">
          404
        </h1>

        <h2 className="mt-6 text-3xl font-semibold">
          {t("error.title")}
        </h2>

        <p className="mt-4 text-lg text-muted-foreground">
          {t("error.description")}
        </p>


        <div className="mt-8">

          <Link
            to={`/${lang}`}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("error.button")}
          </Link>

        </div>


        {import.meta.env.DEV && (
          <pre className="mt-8 max-w-full overflow-auto rounded-md bg-muted p-4 text-left text-sm">
            {JSON.stringify(error, null, 2)}
          </pre>
        )}

      </div>

    </main>
  );
}