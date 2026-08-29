import SectionHead from "@/components/ui/SectionHead";
import TextLink from "@/components/ui/TextLink";
import { work, type Engagement } from "@/lib/content";
import styles from "./Work.module.css";

export function EngagementModule({ item, index }: { item: Engagement; index: number }) {
  /**
   * The last three rows appear only once there is a real engagement
   * behind them. Nothing here is filled in with an estimate.
   */
  const rows = [
    { label: "The problem", text: item.problem },
    { label: "What we changed", text: item.engineered },
    { label: "Time to first working version", text: item.timeToFirst },
    { label: "In production", text: item.inProduction },
    { label: "Measured result", text: item.measured },
    { label: "The outcome", text: item.outcome, accent: true },
  ].filter((row): row is { label: string; text: string; accent?: boolean } =>
    Boolean(row.text)
  );

  return (
    <article className={styles.module}>
      <div className={styles.meta}>
        <span className={`label ${styles.tag}`}>Representative engagement</span>
        <span className="label">{String(index + 1).padStart(2, "0")}</span>
        <p className={styles.sector}>{item.sector}</p>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title} data-reveal="mask">
          <span className="mask-inner">{item.title}</span>
        </h3>

        <dl className={styles.spec}>
          {rows.map((row) => (
            <div
              key={row.label}
              className={`${styles.row} ${row.accent ? styles.outcome : ""}`}
            >
              <dt className={`label ${styles.rowLabel}`}>{row.label}</dt>
              <dd className={styles.rowText}>{row.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

export default function Work({ limit }: { limit?: number }) {
  const items = typeof limit === "number" ? work.items.slice(0, limit) : work.items;

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="shell grid12">
        <SectionHead
          id="work-title"
          label={work.label}
          headline={work.headline}
          lede={work.lede}
        />
        <span className={styles.headLink}>
          <TextLink href="/work">
            <span className="label">See all three</span>
          </TextLink>
        </span>

        <div className={styles.list}>
          {items.map((item, i) => (
            <EngagementModule key={item.id} item={item} index={i} />
          ))}
          <p className={styles.note}>
            {work.disclosure}
          </p>
        </div>
      </div>
    </section>
  );
}
