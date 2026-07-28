import { Link, useParams, useRouteError } from "react-router-dom";


export default function Error() {
  const error = useRouteError();
  const { lang = "es" } = useParams();


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
          Esta tortilla se ha dado la vuelta...
        </h2>

        <p className="mt-4 text-lg text-muted-foreground">
          Parece que esta página no existe.
          Quizás alguien intentó darle la vuelta demasiado pronto.
        </p>


        <div className="mt-8">

          <Link
            to={`/${lang}`}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Volver a la cocina
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