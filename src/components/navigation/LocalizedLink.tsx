import React from "react";

type LocalizedLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  lang?: string;
  children: React.ReactNode;
};

export default function LocalizedLink({
  to,
  lang,
  children,
  className,
  ...props
}: LocalizedLinkProps) {
  let activeLang = lang;
  if (!activeLang && typeof window !== "undefined") {
    const parts = window.location.pathname.split("/").filter(Boolean);
    if (parts.length > 0 && ["es", "en", "de"].includes(parts[0])) {
      activeLang = parts[0];
    }
  }
  const language = activeLang && ["es", "en", "de"].includes(activeLang) ? activeLang : "es";

  const cleanTo = to.startsWith("/") ? to : `/${to}`;
  const path = cleanTo === "/" ? `/${language}` : `/${language}${cleanTo}`;

  return (
    <a href={path} className={className} {...props}>
      {children}
    </a>
  );
}
