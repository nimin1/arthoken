import styles from "./SectionHead.module.css";

type Props = {
  label: string;
  headline: string | readonly string[];
  lede?: string;
  /** Visual weight. Sections are deliberately not all the same loudness. */
  size?: "display-3" | "display-2" | "display-1" | "display-0";
  /**
   * split   — headline left, lede opposite it, across the full 12-column
   *           shell. The default, and only valid when the head is a direct
   *           child of a full-width `.grid12`. Placing it inside a narrower
   *           container squeezes the lede into a one-word ribbon.
   * stacked — lede under the headline. Use inside any narrow column,
   *           sidebar or card.
   */
  variant?: "split" | "stacked";
  wide?: boolean;
  className?: string;
  id?: string;
  /** Extra node dropped into the aside column, under the lede. */
  aside?: React.ReactNode;
};

export default function SectionHead({
  label,
  headline,
  lede,
  size = "display-2",
  variant = "split",
  wide = false,
  className,
  id,
  aside,
}: Props) {
  const lines = Array.isArray(headline) ? headline : [headline as string];

  const title = (
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
  );

  const eyebrow = (
    <p className="eyebrow">
      <span className="label">{label}</span>
    </p>
  );

  if (variant === "stacked" || (!lede && !aside)) {
    return (
      <div className={[styles.head, className].filter(Boolean).join(" ")}>
        {eyebrow}
        {title}
        {lede ? (
          <p
            className={`lede ${styles.lede}`}
            data-reveal="fade"
            style={{ ["--reveal-delay" as string]: "180ms" }}
          >
            {lede}
          </p>
        ) : null}
        {aside}
      </div>
    );
  }

  return (
    <div className={["head-split", className].filter(Boolean).join(" ")}>
      <div className="head-split__brow">{eyebrow}</div>
      <div className="head-split__main">{title}</div>
      <div className="head-split__aside">
        {lede ? (
          <p
            className={`lede ${styles.asideLede}`}
            data-reveal="fade"
            style={{ ["--reveal-delay" as string]: "180ms" }}
          >
            {lede}
          </p>
        ) : null}
        {aside}
      </div>
    </div>
  );
}
