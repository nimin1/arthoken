import { wrap } from "@/lib/wrap";
import styles from "./Diagram.module.css";

/**
 * The imagination step, drawn. On the left, the process as it is described
 * in the first meeting. On the right, the version that comes back — fewer
 * steps, because half of them existed to serve a system nobody runs any more.
 */

const ASKED = [
  "Fill in the form",
  "Wait in the queue",
  "Reviewer opens four systems",
  "Reviewer decides",
  "Email the outcome",
  "Someone updates the sheet",
];

const RETURNED = [
  "Everything is gathered before anyone is asked",
  "One decision, with the reasoning already shown",
  "Everything downstream updates itself",
];

const H = 44;
const GAP = 12;
const TOP = 92;

export default function ReframeDiagram() {
  return (
    <figure className={styles.frame} data-panel="dark">
      <figcaption className={styles.frameHead}>
        <span className={styles.dots} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="label">The same job, rethought</span>
      </figcaption>

      <div className={styles.scroller}>
        <svg
          className={styles.svg}
          viewBox="0 0 1200 460"
          role="img"
          aria-label="Two versions of the same approval process. On the left, the process as described: fill in a form, wait in a queue, a reviewer opens four systems, decides, emails the outcome, and somebody updates a spreadsheet. On the right, the version we would propose: everything is gathered before anyone is asked, one decision is made with the reasoning already shown, and everything downstream updates itself. The form is gone."
        >
          {/* left — what was described */}
          <rect x={20} y={44} width={520} height={392} rx={8} className={styles.zone} />
          <text className={styles.zoneLabel} x={44} y={72}>
            What was described
          </text>
          {ASKED.map((step, i) => {
            const y = TOP + i * (H + GAP);
            return (
              <g key={step}>
                <rect x={44} y={y} width={472} height={H} rx={5} className={styles.box} />
                <text className={styles.boxCaption} x={62} y={y + 26}>
                  {String(i + 1).padStart(2, "0")}
                </text>
                <text className={styles.boxLine} x={98} y={y + 27}>
                  {step}
                </text>
                {i < ASKED.length - 1 ? (
                  <path className={styles.wireSoft} d={`M280 ${y + H}V${y + H + GAP}`} />
                ) : null}
              </g>
            );
          })}

          {/* the question in the middle */}
          <path className={styles.wireAccent} d="M556 240H636" />
          <path className={styles.head} d="M634 236L644 240L634 244Z" />
          <text className={styles.loopLabel} x={596} y={224} textAnchor="middle">
            we ask why
          </text>
          <text className={styles.loopLabel} x={596} y={266} textAnchor="middle">
            each step exists
          </text>

          {/* right — what comes back */}
          <rect x={660} y={44} width={520} height={392} rx={8} className={styles.boxAccent} />
          <text className={styles.zoneLabel} x={684} y={72}>
            What we came back with
          </text>
          {RETURNED.map((step, i) => {
            const y = TOP + i * (H + 30 + GAP);
            const lines = wrap(step, 34);
            return (
              <g key={step}>
                <rect x={684} y={y} width={472} height={H + 26} rx={5} className={styles.box} />
                <text className={styles.boxCaptionAccent} x={702} y={y + 26}>
                  {String(i + 1).padStart(2, "0")}
                </text>
                {lines.map((line, l) => (
                  <text key={line} className={styles.boxLineStrong} x={738} y={y + 27 + l * 19}>
                    {line}
                  </text>
                ))}
              </g>
            );
          })}
          <text className={styles.loopLabel} x={684} y={410}>
            the form is gone
          </text>
        </svg>
      </div>

      <p className={`label ${styles.hint}`}>Scroll the diagram sideways →</p>
    </figure>
  );
}
