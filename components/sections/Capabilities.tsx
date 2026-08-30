import SectionHead from "@/components/ui/SectionHead";
import TextLink from "@/components/ui/TextLink";
import { capabilities } from "@/lib/content";
import styles from "./Capabilities.module.css";

/**
 * `compact` is the homepage pointer: the five names and a link, so the
 * page says what we build without reprinting the Capabilities page.
 */
export default function Capabilities({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <section className="section section--sunk" id="capabilities" aria-labelledby="capabilities-title">
        <div className="shell grid12">
          <SectionHead
            id="capabilities-title"
            label={capabilities.label}
            headline={capabilities.headline}
            lede={capabilities.shortLede}
          />

          <ul className={styles.compact} data-rise>
            {capabilities.items.map((cap, i) => (
              <li
                key={cap.n}
                className={styles.compactRow}
                data-reveal="fade"
                style={{ ["--reveal-delay" as string]: `${Math.min(i, 4) * 50}ms` }}
              >
                <span className={`label ${styles.n}`}>{cap.n}</span>
                <h3 className={styles.compactTitle}>{cap.title}</h3>
                <p className={styles.compactLede}>{cap.lede}</p>
              </li>
            ))}
          </ul>

          <p className={styles.more}>
            <TextLink href="/capabilities">
              <span className="label">See what each one involves</span>
            </TextLink>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section section--sunk" id="capabilities" aria-labelledby="capabilities-title">
      <div className="shell grid12">
        <SectionHead
          id="capabilities-title"
          label={capabilities.label}
          headline={capabilities.headline}
          lede={capabilities.lede}
        />

        <ul className={styles.list} data-rise>
          {capabilities.items.map((cap, i) => (
            <li
              key={cap.n}
              className={styles.row}
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: `${Math.min(i, 3) * 60}ms` }}
            >
              <span className={`label ${styles.n}`}>{cap.n}</span>
              <h3 className={styles.title}>{cap.title}</h3>
              <p className={styles.lede}>{cap.lede}</p>
              <p className={styles.when}>
                <span className="label">Engaged when</span>
                <span className={styles.whenBody}>{cap.engagedWhen}</span>
              </p>
            </li>
          ))}
        </ul>

        <p className={styles.closing}>{capabilities.closing}</p>

        <p className={styles.more}>
          <TextLink href="/capabilities">
            <span className="label">See what each one involves</span>
          </TextLink>
        </p>
      </div>
    </section>
  );
}
