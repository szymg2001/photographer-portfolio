import Link from "next/link";
import "@/styles/heading.css";

interface HeadingPropsI {
  value: string;
  returnValue?: string;
  className?: string;
}
export default function Heading({
  value,
  returnValue = "Wróć do strony głównej",
  className = "",
}: HeadingPropsI) {
  return (
    <div className="head-component">
      <h1 className={`head-component__heading ${className}`}>{value}</h1>
      <Link className="head-component__link" href="/">
        {returnValue}
      </Link>
    </div>
  );
}
