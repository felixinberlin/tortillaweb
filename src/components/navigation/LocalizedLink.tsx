import { Link, type LinkProps, useParams } from "react-router-dom";


type LocalizedLinkProps = Omit<LinkProps, "to"> & {
  to: string;
};


export default function LocalizedLink({
  to,
  children,
  ...props
}: LocalizedLinkProps) {

  const { lang } = useParams();


  const language = lang || "es";


  const path = to.startsWith("/")
    ? `/${language}${to}`
    : `/${language}/${to}`;


  return (
    <Link
      to={path}
      {...props}
    >
      {children}
    </Link>
  );
}
