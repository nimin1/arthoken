import Button from "@/components/ui/Button";
import LayerStack from "@/components/motif/LayerStack";
import PointerParallax from "@/components/motif/PointerParallax";
import { hero } from "@/lib/content";
import styles from "./Hero.module.css";

/**
 * The arrival. The headline is the promise rather than a category
 * description, and the layer stack is an architectural slab that runs
 * off the right edge of the viewport rather than a card on the page.
 */
export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`shell grid12 ${styles.inner}`}>
        <div className={styles.copy}>
          <p className="eyebrow" data-reveal="fade">
            <span className="label">{hero.label}</span>
          </p>

          <h1 id="hero-title" className={`display-0 ${styles.headline}`}>
            {hero.headline.map((line, i) => (
              <span
                key={line}
                data-reveal="mask"
                style={{ ["--reveal-delay" as string]: `${100 + i * 110}ms` }}
              >
                <span className="mask-inner">{line}</span>
              </span>
            ))}
          </h1>

          <p
            className={`lede ${styles.lede}`}
            data-reveal="fade"
            style={{ ["--reveal-delay" as string]: "440ms" }}
          >
            {hero.lede}
          </p>

          <div
            className={styles.actions}
            data-reveal="fade"
            style={{ ["--reveal-delay" as string]: "520ms" }}
          >
            <Button href={hero.primary.href} magnetic>
              {hero.primary.label}
            </Button>
            <Button href={hero.secondary.href} variant="ghost">
              {hero.secondary.label}
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.slab} data-panel="dark" aria-hidden="true">
        <div className={styles.slabTop}>
          <span className="label label--mono">System layers</span>
          <span className="label label--mono">fig. 01</span>
        </div>
        <PointerParallax strength={22}>
          <LayerStack />
        </PointerParallax>
      </div>

      <div className="shell">
        <div
          className={styles.strip}
          data-reveal="fade"
          style={{ ["--reveal-delay" as string]: "620ms" }}
        >
          {hero.strip.map((item) => (
            <span key={item} className={`label ${styles.chip}`}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
