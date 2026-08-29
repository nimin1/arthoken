import { hardening } from "@/lib/content";
import styles from "./Diagram.module.css";

/**
 * The same system twice. Left is what a demo contains. Right is what has to
 * be true before anyone can put their name on it.
 */

const CORE_H = 56;

export default function HardeningDiagram() {
  return (
    <figure className={styles.frame}>
      <figcaption className={styles.frameHead}>
        <span className={styles.dots} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="label">The same system, twice</span>
      </figcaption>

      <div className={styles.scroller}>
        <svg
          className={styles.svg}
          viewBox="0 0 1200 430"
          role="img"
          aria-label="Two versions of the same system side by side. The week-one demo contains an interface, some logic and a model. The production version we hand over contains the same three parts plus automated tests, evaluations running in CI, tracing, alerting, access control, data boundaries, working rollback, cost limits, runbooks and a trained team."
        >
          {/* week one */}
          <rect x={20} y={56} width={340} height={332} rx={8} className={styles.zone} />
          <text className={styles.frameTitle} x={40} y={82}>
            Week one — what you click
          </text>
          {hardening.demo.map((item, i) => (
            <g key={`demo-${item}`}>
              <rect x={52} y={116 + i * 78} width={276} height={CORE_H} rx={6} className={styles.box} />
              <text className={styles.boxTitle} x={68} y={116 + i * 78 + 34}>
                {item}
              </text>
            </g>
          ))}

          <path className={styles.wire} d="M376 222H414" />
          <path className={styles.head} d="M412 218L420 222L412 226Z" />

          {/* what we hand over */}
          <rect x={440} y={56} width={740} height={332} rx={8} className={styles.boxAccent} />
          <text className={styles.frameTitle} x={464} y={82}>
            What we hand over
          </text>

          {hardening.demo.map((item, i) => (
            <g key={`prod-${item}`}>
              <rect x={464} y={116 + i * 78} width={230} height={CORE_H} rx={6} className={styles.box} />
              <text className={styles.boxTitle} x={480} y={116 + i * 78 + 34}>
                {item}
              </text>
            </g>
          ))}

          <path className={styles.wireSoft} d="M712 116V344" />

          {hardening.production.map((item, i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            const x = 724 + col * 226;
            const y = 108 + row * 54;
            return (
              <g key={item}>
                <rect x={x} y={y} width={212} height={40} rx={5} className={styles.chip} />
                <rect x={x + 12} y={y + 17} width={6} height={6} fill="var(--accent)" />
                <text className={styles.chipLabel} x={x + 28} y={y + 25}>
                  {item}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <p className={`label ${styles.hint}`}>Scroll the diagram sideways →</p>
    </figure>
  );
}
