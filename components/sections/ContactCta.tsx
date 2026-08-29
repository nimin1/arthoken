import Button from "@/components/ui/Button";
import TextLink from "@/components/ui/TextLink";
import { cta, site } from "@/lib/content";
import styles from "./ContactCta.module.css";

export default function ContactCta() {
  return (
    <section className={styles.section} aria-labelledby="cta-title">
      <div className="shell">
        <div className={styles.panel}>
          <div className={styles.inner}>
            <div className={styles.copy}>
              <h2 id="cta-title" className={styles.headline}>
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
        </div>
      </div>
    </section>
  );
}
