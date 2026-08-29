import styles from "./Diagram.module.css";

/**
 * How we replace a system that cannot be switched off: a façade in front,
 * capabilities moved out one at a time, both sides replayed and compared,
 * and traffic shifted only when the evidence allows.
 */

const MOVED = [
  { name: "Orders", state: "live", tone: "on" as const },
  { name: "Pricing", state: "shadow", tone: "half" as const },
  { name: "Billing", state: "queued", tone: "off" as const },
];

export default function StranglerDiagram() {
  return (
    <figure className={styles.frame}>
      <figcaption className={styles.frameHead}>
        <span className={styles.dots} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="label">Migration pattern — no big-bang cutover</span>
      </figcaption>

      <div className={styles.scroller}>
        <svg
          className={styles.svg}
          viewBox="0 0 1200 430"
          role="img"
          aria-label="Migration diagram. All traffic goes through a façade. Behind it, capabilities are moved out one at a time into new services while the legacy system keeps running. Both sides are replayed and compared, and traffic shifts to the new services only when results are identical."
        >
          <defs>
            <pattern id="hatch" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
            </pattern>
          </defs>

          {/* traffic in */}
          <rect x={20} y={182} width={120} height={62} rx={10} className={styles.boxGhost} />
          <text className={styles.boxTitle} x={36} y={210}>
            Traffic
          </text>
          <text className={styles.boxCaption} x={36} y={230}>
            all of it
          </text>
          <path className={styles.wire} d="M140 213H184" />
          <path className={styles.head} d="M182 209L190 213L182 217Z" />

          {/* façade */}
          <rect x={196} y={142} width={150} height={142} rx={10} className={styles.boxAccent} />
          <text className={styles.boxTitle} x={214} y={196}>
            Façade
          </text>
          <text className={styles.boxCaptionAccent} x={214} y={216}>
            one front door
          </text>

          {/* façade out, up and down */}
          <path className={styles.wireAccent} d="M346 186H384V128H414" />
          <path className={styles.head} d="M412 124L420 128L412 132Z" />
          <path className={styles.wire} d="M346 240H384V310H414" />
          <path className={styles.head} d="M412 306L420 310L412 314Z" />

          <path className={styles.flow} pathLength={1} d="M150 213H196M346 186H384V128H420" />

          {/* new services */}
          <rect x={420} y={48} width={310} height={160} rx={12} className={styles.box} />
          <text className={styles.boxTitle} x={438} y={78}>
            New services
          </text>
          {MOVED.map((m, i) => {
            const y = 96 + i * 34;
            const fill =
              m.tone === "on"
                ? "rgba(45,216,224,0.9)"
                : m.tone === "half"
                  ? "rgba(45,216,224,0.42)"
                  : "rgba(255,255,255,0.14)";
            return (
              <g key={m.name}>
                <rect x={438} y={y} width={274} height={26} rx={6} fill="rgba(255,255,255,0.028)" />
                <rect x={448} y={y + 10} width={7} height={7} rx={1.5} fill={fill} />
                <text className={styles.boxCaption} x={468} y={y + 18}>
                  {m.name}
                </text>
                <text className={styles.boxCaption} x={640} y={y + 18}>
                  {m.state}
                </text>
              </g>
            );
          })}

          {/* legacy */}
          <rect x={420} y={252} width={310} height={130} rx={12} className={styles.boxGhost} />
          <rect x={420} y={252} width={310} height={130} rx={12} fill="url(#hatch)" />
          <text className={styles.boxTitle} x={438} y={292}>
            Legacy system
          </text>
          <text className={styles.boxCaption} x={438} y={312}>
            still running · shrinking
          </text>

          {/* compare */}
          <path className={styles.wire} d="M730 128H778V196H806" />
          <path className={styles.wire} d="M730 316H778V232H806" />
          <path className={styles.head} d="M804 192L812 196L804 200Z" />
          <path className={styles.head} d="M804 228L812 232L804 236Z" />

          <rect x={812} y={148} width={244} height={132} rx={12} className={styles.boxAccent} />
          <text className={styles.boxTitle} x={832} y={190}>
            Replay &amp; compare
          </text>
          <text className={styles.boxCaptionAccent} x={832} y={210}>
            identical? then switch
          </text>
          <text className={styles.boxCaption} x={832} y={238}>
            real production traffic
          </text>

          {/* traffic share */}
          <text className={styles.zoneLabel} x={1096} y={64}>
            Traffic
          </text>
          <rect x={1096} y={80} width={64} height={280} rx={8} className={styles.box} />
          <rect x={1097} y={81} width={62} height={116} rx={7} fill="rgba(45,216,224,0.24)" />
          <text className={styles.boxCaptionAccent} x={1104} y={128}>
            new
          </text>
          <text className={styles.boxCaption} x={1104} y={280}>
            legacy
          </text>
          <path className={styles.wireAccent} d="M1096 197H1160" />
        </svg>
      </div>

      <p className={`label ${styles.hint}`}>Scroll the diagram sideways →</p>
    </figure>
  );
}
