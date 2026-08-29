import styles from "./PageHeader.module.css";

export default function PageHeader({
  label,
  headline,
  lede,
}: {
  label: string;
  headline: string;
  lede?: string;
}) {
  return (
    <header className={styles.header}>
      <div className="shell grid12">
        <p className={`eyebrow ${styles.label}`}>
          <span className="label">{label}</span>
        </p>
        <h1 className={styles.headline} data-reveal="mask">
          <span className="mask-inner">{headline}</span>
        </h1>
        {lede ? (
          <p className={`lede ${styles.lede}`} data-reveal="fade" style={{ ["--reveal-delay" as string]: "140ms" }}>
            {lede}
          </p>
        ) : null}
      </div>
    </header>
  );
}
