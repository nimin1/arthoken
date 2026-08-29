import Button from "@/components/ui/Button";
import TextLink from "@/components/ui/TextLink";
import { cta, site } from "@/lib/content";
import styles from "./ContactCta.module.css";

/**
 * The second stage, and the bookend to the offer near the top. Same
 * ground, same voice, so the page opens and closes on the same note.
 */
export default function ContactCta() {
  return (
    <section
      className={`stage ${styles.section}`}
      data-panel="dark"
      aria-labelledby="cta-title"
    >
      <div className={`shell grid12 ${styles.inner}`}>
        <div className={styles.copy}>
          <h2 id="cta-title" className={`display-0 ${styles.headline}`}>
            {cta.headline.map((line, i) => (
              <span
                key={line}
                data-reveal="mask"
                style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
              >
                <span className="mask-inner">{line}</span>
              </span>
            ))}
          </h2>
          <p className={styles.body} data-reveal="fade">
            {cta.body}
          </p>
        </div>

        <div
          className={styles.actions}
          data-reveal="fade"
          style={{ ["--reveal-delay" as string]: "140ms" }}
        >
          <div className={styles.secondRung}>
            <Button href={cta.primary.href} magnetic>
              {cta.primary.label}
            </Button>
            <Button href={cta.secondary.href} variant="ghost">
              {cta.secondary.label}
            </Button>
          </div>
          <p className={styles.email}>
            Or write to <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>
          </p>
        </div>
      </div>
    </section>
  );
}
