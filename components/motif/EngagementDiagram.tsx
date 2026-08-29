import styles from "./Diagram.module.css";

/**
 * The commercial shape of an engagement, drawn honestly: everything left of
 * the line costs nothing, and the line is where the client decides.
 */

const BOX_H = 66;
const ROW = 118;
const LINE_X = 726;

type Node = { x: number; w: number; title: string; caption: string; tone?: "accent" | "ghost" };

const LEFT: Node[] = [
  { x: 40, w: 176, title: "First conversation", caption: "you talk, we listen" },
  { x: 252, w: 190, title: "We go and build", caption: "a few days", tone: "accent" },
  { x: 478, w: 190, title: "You click it", caption: "and break it", tone: "accent" },
];

const RIGHT: Node[] = [
  { x: 786, w: 160, title: "You say yes", caption: "or you don't" },
  { x: 982, w: 198, title: "Production build", caption: "harden and hand over" },
];

function Box({ node }: { node: Node }) {
  return (
    <g>
      <rect
        x={node.x}
        y={ROW}
        width={node.w}
        height={BOX_H}
        rx={6}
        className={
          node.tone === "accent" ? styles.boxAccent : node.tone === "ghost" ? styles.boxGhost : styles.box
        }
      />
      <text className={styles.boxTitle} x={node.x + 16} y={ROW + 28}>
        {node.title}
      </text>
      <text
        className={node.tone === "accent" ? styles.boxCaptionAccent : styles.boxCaption}
        x={node.x + 16}
        y={ROW + 48}
      >
        {node.caption}
      </text>
    </g>
  );
}

function Arrow({ from, to }: { from: number; to: number }) {
  const y = ROW + BOX_H / 2;
  return (
    <g>
      <path className={styles.wire} d={`M${from} ${y}H${to - 7}`} />
      <path className={styles.head} d={`M${to - 9} ${y - 4}L${to} ${y}L${to - 9} ${y + 4}Z`} />
    </g>
  );
}

export default function EngagementDiagram() {
  return (
    <figure className={styles.frame}>
      <figcaption className={styles.frameHead}>
        <span className={styles.dots} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="label">How an engagement runs</span>
      </figcaption>

      <div className={styles.scroller}>
        <svg
          className={styles.svg}
          viewBox="0 0 1200 344"
          role="img"
          aria-label="How an engagement runs. First conversation, then we build for a few days, then you click a working version and break it, and the next version comes back quickly. Nothing is invoiced before you decide. After you say yes, we build the production version and hand it over."
        >
          {/* zones */}
          <rect x={20} y={78} width={686} height={210} rx={8} className={styles.zone} />
          <rect x={746} y={78} width={434} height={210} rx={8} className={styles.zone} />
          <text className={styles.zoneLabel} x={40} y={100}>
            Costs you nothing
          </text>
          <text className={styles.zoneLabel} x={766} y={100}>
            Now it's an engagement
          </text>

          {/* the line */}
          <path className={styles.payLine} d={`M${LINE_X} 44V300`} />
          <rect x={LINE_X - 148} y={22} width={296} height={30} rx={15} className={styles.boxAccent} />
          <text className={styles.payLabel} x={LINE_X} y={41} textAnchor="middle">
            Nothing invoiced before this line
          </text>

          {LEFT.map((n) => (
            <Box key={n.title} node={n} />
          ))}
          {RIGHT.map((n) => (
            <Box key={n.title} node={n} />
          ))}

          <Arrow from={216} to={252} />
          <Arrow from={442} to={478} />
          <Arrow from={668} to={LINE_X} />
          <Arrow from={LINE_X + 14} to={786} />
          <Arrow from={946} to={982} />

          {/* the loop that makes the whole thing work */}
          <path
            className={styles.wireAccent}
            d={`M573 ${ROW + BOX_H}V232Q573 244 561 244H359Q347 244 347 232V${ROW + BOX_H}`}
          />
          <path className={styles.head} d={`M343 ${ROW + BOX_H + 9}L347 ${ROW + BOX_H}L351 ${ROW + BOX_H + 9}Z`} />
          <text className={styles.loopLabel} x={460} y={268} textAnchor="middle">
            next version, before you've stopped thinking about the last one
          </text>

          {/* day scale */}
          <path className={styles.wireSoft} d="M40 312H1180" />
          {[
            { x: 40, t: "day 0" },
            { x: 252, t: "days 1–5" },
            { x: 478, t: "day 5–10" },
            { x: 786, t: "your call" },
            { x: 982, t: "from here" },
          ].map((d) => (
            <text key={d.t} className={styles.scaleLabel} x={d.x} y={330}>
              {d.t}
            </text>
          ))}
        </svg>
      </div>

      <p className={`label ${styles.hint}`}>Scroll the diagram sideways →</p>
    </figure>
  );
}
