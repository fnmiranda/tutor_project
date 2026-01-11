import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & {
  /** Tamanho via Tailwind ou CSS (ex.: "w-6 h-6"). */
  className?: string;
  /** Título acessível opcional. */
  title?: string;
};

/** Ícone de estrela (sólida) reutilizável */
export default function StarIcon({
  className = "w-4 h-4",
  title,
  ...rest
}: Props) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : "presentation"}
      className={className}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.12 3.45a1 1 0 0 0 .95.69h3.627c.968 0 1.371 1.24.588 1.81l-2.936 2.133a1 1 0 0 0-.364 1.118l1.12 3.45c.3.921-.755 1.688-1.54 1.118L10.95 14.65a1 1 0 0 0-1.175 0l-2.586 1.867c-.784.57-1.84-.197-1.54-1.118l1.12-3.45a1 1 0 0 0-.364-1.118L3.47 8.877c-.783-.57-.38-1.81.588-1.81h3.627a1 1 0 0 0 .95-.69l1.12-3.45Z" />
    </svg>
  );
}
