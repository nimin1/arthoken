import styles from "./Diagram.module.css";

/**
 * Reference architecture for an AI system we would actually ship.
 * The point of the drawing: the model does language work, the decision
 * stays in ordinary code, and a person is accountable for the outcome.
 */

type Box = {
  x: number;
  y: number;
  w: number;
  title: string;
  caption: string;
  tone?: "default" | "accent" | "ghost";
};

const H = 66;
const ROW1 = 46;
const ROW2 = 182;

const BOXES: Box[] = [
  { x: 20, y: ROW1, w: 150, title: "Your team", caption: "asks & approves", tone: "ghost" },
  { x: 210, y: ROW1, w: 170, title: "Interface", caption: "what they use" },
  { x: 420, y: ROW1, w: 190, title: "Orchestration", caption: "plans the steps" },
  { x: 650, y: ROW1, w: 210, title: "Decision layer", caption: "deterministic", tone: "accent" },
  { x: 900, y: ROW1, w: 280, title: "Systems of record", caption: "where change lands" },
  { x: 372, y: ROW2, w: 150, title: "Retrieval", caption: "your own content" },
  { x: 538, y: ROW2, w: 150, title: "Model", caption: "language work only" },
  { x: 650, y: ROW2 + 96, w: 210, title: "Human approval", caption: "on what matters", tone: "accent" },
];

const RAIL = ["Evaluation", "Tracing", "Guardrails", "Security & data boundaries"];

function arrow(x1: number, x2: number, y: number) {
  return `M${x1} ${y}H${x2 - 6}`;
}

export default function ArchitectureDiagram() {
  const midY = ROW1 + H / 2;

  return (
    <figure className={styles.frame} data-panel="dark">
      <figcaption className={styles.frameHead}>
        <span className={styles.dots} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="label label--mono">Reference architecture for AI in production</span>
      </figcaption>

      <div className={styles.scroller}>
        <svg
          className={styles.svg}
          viewBox="0 0 1200 444"
          role="img"
          aria-label="Reference architecture. Your team uses an interface. An orchestration layer plans steps and calls retrieval over your own content and a language model. Decisions are made in a deterministic decision layer, a person approves what matters, and changes land in your systems of record. Evaluation, tracing, guardrails and security run underneath the whole system."
        >
          {/* main path */}
          {[
            [170, 210],
            [380, 420],
            [610, 650],
            [860, 900],
          ].map(([a, b]) => (
            <g key={a}>
              <path className={styles.wire} d={arrow(a, b, midY)} />
              <path className={styles.head} d={`M${b - 8} ${midY - 4}L${b} ${midY}L${b - 8} ${midY + 4}Z`} />
            </g>
          ))}

          {/* the travelling signal */}
          <path
            className={styles.flow}
            pathLength={1}
            d={`M175 ${midY}H1175`}
          />

          {/* orchestration down to retrieval and model */}
          <path className={styles.wireAccent} d={`M470 ${ROW1 + H}V${ROW2 - 26}H447V${ROW2}`} />
          <path className={styles.wireAccent} d={`M560 ${ROW1 + H}V${ROW2 - 26}H613V${ROW2}`} />
          <path className={styles.head} d={`M443 ${ROW2 - 8}L447 ${ROW2}L451 ${ROW2 - 8}Z`} />
          <path className={styles.head} d={`M609 ${ROW2 - 8}L613 ${ROW2}L617 ${ROW2 - 8}Z`} />

          {/* decision down to human approval */}
          <path className={styles.wireAccent} d={`M755 ${ROW1 + H}V${ROW2 + 96}`} />
          <path className={styles.head} d={`M751 ${ROW2 + 88}L755 ${ROW2 + 96}L759 ${ROW2 + 88}Z`} />

          {/* rail, and its faint reach into every stage */}
          {[250, 1040].map((x) => (
            <path key={x} className={styles.wireSoft} d={`M${x} ${ROW1 + H}V356`} />
          ))}

          <rect x={20} y={356} width={1160} height={72} rx={10} className={styles.boxGhost} />
          <text className={styles.zoneLabel} x={40} y={382}>
            Underneath all of it
          </text>
          {RAIL.map((item, i) => (
            <text key={item} className={styles.railLabel} x={40 + i * 285} y={408}>
              {item}
            </text>
          ))}

          {/* boxes */}
          {BOXES.map((b) => (
            <g key={b.title}>
              <rect
                x={b.x}
                y={b.y}
                width={b.w}
                height={H}
                rx={10}
                className={
                  b.tone === "accent"
                    ? styles.boxAccent
                    : b.tone === "ghost"
                      ? styles.boxGhost
                      : styles.box
                }
              />
              <text className={styles.boxTitle} x={b.x + 16} y={b.y + 28}>
                {b.title}
              </text>
              <text
                className={b.tone === "accent" ? styles.boxCaptionAccent : styles.boxCaption}
                x={b.x + 16}
                y={b.y + 48}
              >
                {b.caption}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <p className={`label ${styles.hint}`}>Scroll the diagram sideways →</p>
    </figure>
  );
}
