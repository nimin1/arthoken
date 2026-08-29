import styles from "./LayerStack.module.css";

/**
 * The hero diagram: the layers of a working system, drawn in the same
 * 30° projection as the Arthoken mark. Infrastructure at the bottom,
 * experience at the top, signal moving between them.
 *
 * All geometry is computed on the server — the browser receives paths.
 */

const U = 54;
const DZ = 60;
const CX = 330;
const CY = 434;
const HALF = 2;
const COS30 = Math.cos(Math.PI / 6);

const f = (n: number) => Math.round(n * 10) / 10;

function p(x: number, y: number, level: number): [number, number] {
  return [CX + (x - y) * COS30 * U, CY + (x + y) * 0.5 * U - level * DZ];
}

function poly(points: Array<[number, number]>) {
  return points.map(([x, y]) => `${f(x)},${f(y)}`).join(" ");
}

type Layer = {
  name: string;
  nodes: Array<[number, number]>;
};

const LAYERS: Layer[] = [
  { name: "Infrastructure", nodes: [[-1.3, -1.1], [0.2, -1.4], [1.3, -0.2], [0.1, 1.2], [-1.2, 0.6]] },
  { name: "Data", nodes: [[-1.1, -0.6], [0.6, -1.2], [1.2, 0.7], [-0.4, 1.2]] },
  { name: "Services", nodes: [[-1.3, 0.1], [-0.1, -1.2], [1.2, -0.4], [0.7, 1.1]] },
  { name: "Intelligence", nodes: [[-0.8, -0.7], [0.9, -0.5], [0.1, 1.0]] },
  { name: "Experience", nodes: [[-0.5, -0.4], [0.8, 0.4]] },
];

/** Which node of layer i links up to which node of layer i+1. */
const LINKS: Array<[number, number]> = [
  [1, 1],
  [3, 2],
  [2, 1],
  [0, 0],
];

function planePath(level: number) {
  return poly([
    p(-HALF, -HALF, level),
    p(HALF, -HALF, level),
    p(HALF, HALF, level),
    p(-HALF, HALF, level),
  ]);
}

function meshPaths(level: number) {
  const out: string[] = [];
  for (let i = -1; i <= 1; i += 1) {
    const a = p(i, -HALF, level);
    const b = p(i, HALF, level);
    out.push(`M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}`);
    const c = p(-HALF, i, level);
    const d = p(HALF, i, level);
    out.push(`M${f(c[0])} ${f(c[1])}L${f(d[0])} ${f(d[1])}`);
  }
  return out;
}

function diamond(cx: number, cy: number, r: number) {
  return `M${f(cx)} ${f(cy - r * 0.6)}L${f(cx + r)} ${f(cy)}L${f(cx)} ${f(cy + r * 0.6)}L${f(cx - r)} ${f(cy)}Z`;
}

export default function LayerStack({ className }: { className?: string }) {
  return (
    <div className={[styles.wrap, className].filter(Boolean).join(" ")}>
      <svg
        className={styles.svg}
        viewBox="0 0 780 660"
        role="img"
        aria-label="A diagram of a layered software system: infrastructure, data, services, intelligence and experience, with signal travelling between the layers."
      >
        <defs>
          <radialGradient id="ls-glow" cx="50%" cy="55%" r="55%">
            <stop offset="0%" stopColor="rgba(45,216,224,0.17)" />
            <stop offset="45%" stopColor="rgba(45,216,224,0.07)" />
            <stop offset="100%" stopColor="rgba(45,216,224,0)" />
          </radialGradient>
        </defs>

        {LAYERS.map((layer, i) => {
          const level = i;
          const next = LAYERS[i + 1];
          const link = LINKS[i];
          const linkPath =
            next && link
              ? (() => {
                  const a = p(layer.nodes[link[0]][0], layer.nodes[link[0]][1], level);
                  const b = p(next.nodes[link[1]][0], next.nodes[link[1]][1], level + 1);
                  return `M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}`;
                })()
              : null;

          const right = p(HALF, -HALF, level);

          return (
            <g key={layer.name}>
              <g
                className={styles.layer}
                style={{ animationDelay: `${140 + i * 130}ms` }}
              >
                <polygon className={styles.plane} points={planePath(level)} />
                <g className={styles.mesh}>
                  {meshPaths(level).map((d) => (
                    <path key={d} d={d} />
                  ))}
                </g>
                <polyline
                  className={styles.planeTop}
                  points={poly([p(-HALF, -HALF, level), p(HALF, -HALF, level), p(HALF, HALF, level)])}
                />
                {layer.nodes.map(([nx, ny], n) => {
                  const [px, py] = p(nx, ny, level);
                  return (
                    <path
                      key={`${layer.name}-${n}`}
                      className={n === 0 ? styles.node : styles.nodeSoft}
                      d={diamond(px, py, 5)}
                    />
                  );
                })}
              </g>

              {linkPath ? (
                <g className={styles.layer} style={{ animationDelay: `${240 + i * 130}ms` }}>
                  <path className={styles.link} d={linkPath} />
                  <path
                    className={styles.pulse}
                    d={linkPath}
                    pathLength={1}
                    style={{ animationDelay: `${900 + i * 420}ms` }}
                  />
                </g>
              ) : null}

              <g className={styles.tags}>
                <path
                  className={styles.leader}
                  d={`M${f(right[0] + 6)} ${f(right[1])}H${f(600)}`}
                />
                <text className={styles.tagIndex} x={612} y={right[1] - 3}>
                  {String(i + 1).padStart(2, "0")}
                </text>
                <text className={styles.tag} x={648} y={right[1] - 3}>
                  {layer.name}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
