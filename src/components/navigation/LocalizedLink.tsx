import { Link, type LinkProps, useParams, useLocation } from "react-router-dom";

type LocalizedLinkProps = Omit<LinkProps, "to"> & {
  to: string;
};

export default function LocalizedLink({
  to,
  children,
  ...props
}: LocalizedLinkProps) {
  const { lang } = useParams();
  const location = useLocation();

  const pathLang = location.pathname.split("/").filter(Boolean)[0];
  const activeLang = lang || pathLang;
  const language = ["es", "en", "de"].includes(activeLang) ? activeLang : "es";

  const cleanTo = to.startsWith("/") ? to : `/${to}`;
  const path = cleanTo === "/" ? `/${language}` : `/${language}${cleanTo}`;

  return (
    <Link to={path} {...props}>
      {children}
    </Link>
  );
}
