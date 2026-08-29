import Link from "next/link";
import styles from "./TextLink.module.css";

export default function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={[styles.link, className].filter(Boolean).join(" ")}>
      {children}
    </Link>
  );
}
