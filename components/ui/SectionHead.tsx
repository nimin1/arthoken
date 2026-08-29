import styles from "./SectionHead.module.css";

type Props = {
  label: string;
  headline: string | readonly string[];
  lede?: string;
  size?: "display-2" | "display-1";
  wide?: boolean;
  className?: string;
  id?: string;
};

export default function SectionHead({
  label,
  headline,
  lede,
  size = "display-2",
  wide = false,
  className,
  id,
}: Props) {
  const lines = Array.isArray(headline) ? headline : [headline as string];

  return (
    <div className={[styles.head, className].filter(Boolean).join(" ")}>
      <p className="eyebrow">
        <span className="label">{label}</span>
      </p>
      <h2
        id={id}
        className={[size, styles.headline, wide ? styles.wide : ""].filter(Boolean).join(" ")}
      >
        {lines.map((line, i) => (
          <span
            key={line}
            className={styles.line}
            data-reveal="mask"
            style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
          >
            <span className="mask-inner">{line}</span>
          </span>
        ))}
      </h2>
      {lede ? (
        <p className={`lede ${styles.lede}`} data-reveal="fade" style={{ ["--reveal-delay" as string]: "180ms" }}>
          {lede}
        </p>
      ) : null}
    </div>
  );
}
